import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Editor } from "@tiptap/core";

import { EDITOR_TABS } from "../../constants/constants";
import type { EditorTab } from "../../constants/types";
import type { RibbonMenuItem } from "./components/ribbon/Ribbon.types";

export type EditorSelectionState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  fontFamily: string;
  fontSize: string;
  textAlign: string;
  textColor: string;
  highlightColor: string;
};

const DEFAULT_FONT_FAMILY = "Arial";
const DEFAULT_FONT_SIZE = "14px";

const DEFAULT_TAB = Object.values(EDITOR_TABS)[0]?.value as EditorTab;

export const getEditorSelectionState = (
  editor: Editor | null,
): EditorSelectionState => {
  if (!editor) {
    return {
      bold: false,
      italic: false,
      underline: false,
      strike: false,
      fontFamily: "",
      fontSize: "",
      textAlign: "",
      textColor: "",
      highlightColor: "",
    };
  }

  const textStyle = editor.getAttributes("textStyle") ?? {};
  const highlight = editor.getAttributes("highlight") ?? {};

  return {
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    underline: editor.isActive("underline"),
    strike: editor.isActive("strike"),
    fontFamily: String(textStyle.fontFamily ?? ""),
    fontSize: String(textStyle.fontSize ?? ""),
    textAlign: editor.getAttributes("paragraph")?.textAlign ?? "",
    textColor: String(textStyle.color ?? ""),
    highlightColor: String(highlight.color ?? ""),
  };
};

export const getRibbonItemValue = (
  item: RibbonMenuItem,
  selection: Partial<EditorSelectionState>,
): string => {
  switch (item.action) {
    case "setFontFamily":
      return selection.fontFamily || DEFAULT_FONT_FAMILY;
    case "setFontSize":
      return selection.fontSize || DEFAULT_FONT_SIZE;
    case "setTextColor":
      return selection.textColor || "#000000";
    case "toggleHighlight":
      return selection.highlightColor || "#ffff00";
    default:
      return item.value ?? "";
  }
};

type EditorStateContextValue = {
  editor: Editor | null;
  selection: EditorSelectionState;
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
};

const EditorStateContext = createContext<EditorStateContextValue | undefined>(undefined);

export const EditorStateProvider = ({
  editor,
  children,
}: {
  editor: Editor | null;
  children: ReactNode;
}) => {
  const [selectionVersion, bumpSelectionVersion] = useReducer((value: number) => value + 1, 0);

  const selection = useMemo(
    () => {
      void selectionVersion;
      return getEditorSelectionState(editor);
    },
    [editor, selectionVersion],
  );

  const [activeTab, setActiveTab] = useState<EditorTab>(DEFAULT_TAB);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateSelection = () => {
      bumpSelectionVersion();
    };

    editor.on("transaction", updateSelection);
    editor.on("selectionUpdate", updateSelection);

    return () => {
      editor.off("transaction", updateSelection);
      editor.off("selectionUpdate", updateSelection);
    };
  }, [editor]);

  const value = useMemo(
    () => ({
      editor,
      selection,
      activeTab,
      setActiveTab,
    }),
    [editor, selection, activeTab],
  );

  return React.createElement(EditorStateContext.Provider, { value }, children);
};

export const useEditorState = () => {
  const context = useContext(EditorStateContext);

  if (!context) {
    return {
      editor: null,
      selection: getEditorSelectionState(null),
      activeTab: DEFAULT_TAB,
      setActiveTab: () => undefined,
    };
  }

  return context;
};

export const useEditorSelection = (editorOverride?: Editor | null) => {
  const context = useContext(EditorStateContext);
  const editor = editorOverride ?? context?.editor ?? null;
  const selection = context?.selection ?? getEditorSelectionState(editor);

  return useMemo(
    () => ({
      selection,
      isBold: selection.bold,
      isItalic: selection.italic,
      isUnderline: selection.underline,
      isStrike: selection.strike,
      fontFamily: selection.fontFamily,
      fontSize: selection.fontSize,
      textAlign: selection.textAlign,
      textColor: selection.textColor,
      highlightColor: selection.highlightColor,
    }),
    [selection],
  );
};

export const useEditorContext = useEditorState;
export const EditorSelectionProvider = EditorStateProvider;
