import { useCallback, useEffect, useReducer } from "react";

import { EDITOR_TABS, GROUP_ORDER } from "../../constants/constants";
import type { RibbonMenuItem } from "../../applications/editor/components/ribbon/Ribbon.types";
import {
  executeRibbonAction,
  isRibbonItemActive,
} from "../../applications/editor/components/ribbon/RibbonActions";
import {
  getEditorSelectionState,
  getRibbonItemValue,
} from "../../applications/editor/EditorState";
import useEditor from "../../applications/editor/useEditor";
import type { MiniEditorProps } from "./miniEditor.types";

const HOME_ITEMS = EDITOR_TABS.HOME.items as RibbonMenuItem[];
const HOME_GROUPS = GROUP_ORDER
  .filter((group) => group.key !== "structure")
  .map((group) => ({
    ...group,
    items: HOME_ITEMS.filter((item) => (item.group ?? "other") === group.key),
  }))
  .filter((group) => group.items.length > 0);

const useMiniEditor = ({ value, onChange }: Pick<MiniEditorProps, "value" | "onChange">) => {
  const editor = useEditor();
  const [selectionVersion, bumpSelectionVersion] = useReducer((version: number) => version + 1, 0);

  useEffect(() => {
    if (!editor) return;

    const html = value || "";
    if (editor.getHTML() !== html) {
      editor.commands.setContent(html, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => onChange(editor.getHTML());
    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, onChange]);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionChange = () => bumpSelectionVersion();
    editor.on("transaction", handleSelectionChange);
    editor.on("selectionUpdate", handleSelectionChange);
    return () => {
      editor.off("transaction", handleSelectionChange);
      editor.off("selectionUpdate", handleSelectionChange);
    };
  }, [editor]);

  const handleItemClick = useCallback((item: RibbonMenuItem, selectedValue: string) => {
    if (!editor) return;

    const enrichedItem: RibbonMenuItem = {
      ...item,
      value: selectedValue,
      ...(item.action === "setFontFamily" ? { fontFamily: selectedValue } : {}),
      ...(item.action === "setFontSize" ? { fontSize: selectedValue } : {}),
    };

    executeRibbonAction(editor, enrichedItem, {
      newDocument: () => undefined,
      openDocument: () => undefined,
      saveDocument: () => undefined,
      saveDocumentAs: () => undefined,
      openMediaDialog: () => undefined,
    });
  }, [editor]);

  const selection = editor ? getEditorSelectionState(editor) : getEditorSelectionState(null);
  void selectionVersion;

  const homeGroups = HOME_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      item,
      value: getRibbonItemValue(item, selection),
      isActive: isRibbonItemActive(editor, item),
    })),
  }));

  return { editor, homeGroups, handleItemClick };
};

export default useMiniEditor;
