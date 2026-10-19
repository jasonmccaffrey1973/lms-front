import type { Editor } from "@tiptap/core";
import { describe, expect, it, vi, beforeEach } from "vitest";

const mockEditorState = {
  selection: {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    fontFamily: "Arial",
    fontSize: "14px",
    textAlign: "left",
    textColor: "#000000",
    highlightColor: "#ffff00",
  },
  activeTab: "home",
  setActiveTab: vi.fn(),
  zoomLevel: 1,
  setZoomLevel: vi.fn(),
};

vi.mock("../../EditorState", () => ({
  useEditorState: () => mockEditorState,
  getRibbonItemValue: vi.fn((item, _selection, zoomLevel) => {
    if (item.action === "setZoom") return String(zoomLevel);
    return item.value ?? "";
  }),
}));

vi.mock("./RibbonActions", () => ({
  executeRibbonAction: vi.fn(),
  isRibbonItemActive: vi.fn(() => true),
}));

import type { EditorTab } from "../../../../constants/types";
import { executeRibbonAction, isRibbonItemActive } from "./RibbonActions";
import useRibbon from "./useRibbon";

describe("useRibbon hook", () => {
  const openFileDialog = vi.fn();
  const openMediaDialog = vi.fn();
  const openSpellingGrammarDialog = vi.fn();
  const openTrackChangesDialog = vi.fn();
  const openHelpDialog = vi.fn();

  const mockEditor = {
    chain: vi.fn(),
    isActive: vi.fn(),
  } as unknown as Editor;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles ribbon tab change", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    const nextTab: EditorTab = "insert";
    ribbon.handleRibbonTabChange(nextTab);
    expect(mockEditorState.setActiveTab).toHaveBeenCalledWith("insert");
  });

  it("handles openHelp action", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    ribbon.handleRibbonItemClick({ label: "Help", action: "openHelp" });
    expect(openHelpDialog).toHaveBeenCalledOnce();
    expect(executeRibbonAction).not.toHaveBeenCalled();
  });

  it("handles setZoom action with finite number", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    ribbon.handleRibbonItemClick({ label: "Zoom", action: "setZoom", value: "1.25" });
    expect(mockEditorState.setZoomLevel).toHaveBeenCalledWith(1.25);
    expect(executeRibbonAction).not.toHaveBeenCalled();
  });

  it("ignores setZoom action when value is not a finite number", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    ribbon.handleRibbonItemClick({ label: "Zoom", action: "setZoom", value: "not-a-number" });
    expect(mockEditorState.setZoomLevel).not.toHaveBeenCalled();
  });

  it("returns early without executing action if editor is null", () => {
    const ribbon = useRibbon(
      null,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    ribbon.handleRibbonItemClick({ label: "Bold", action: "toggleBold" });
    expect(executeRibbonAction).not.toHaveBeenCalled();
  });

  it("enriches setFontFamily item with fontFamily property", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    ribbon.handleRibbonItemClick({
      label: "Typeface",
      action: "setFontFamily",
      value: "Times New Roman",
    });

    expect(executeRibbonAction).toHaveBeenCalledWith(
      mockEditor,
      expect.objectContaining({
        label: "Typeface",
        action: "setFontFamily",
        value: "Times New Roman",
        fontFamily: "Times New Roman",
      }),
      expect.any(Object),
    );
  });

  it("enriches setFontSize item with fontSize property", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    ribbon.handleRibbonItemClick({
      label: "Size",
      action: "setFontSize",
      value: "20px",
    });

    expect(executeRibbonAction).toHaveBeenCalledWith(
      mockEditor,
      expect.objectContaining({
        label: "Size",
        action: "setFontSize",
        value: "20px",
        fontSize: "20px",
      }),
      expect.any(Object),
    );
  });

  it("routes file handlers in executeRibbonAction callbacks", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
    );

    ribbon.handleRibbonItemClick({ label: "Bold", action: "toggleBold" });

    const handlersPassed = vi.mocked(executeRibbonAction).mock.calls[0]?.[2];
    expect(handlersPassed).toBeDefined();

    handlersPassed.newDocument();
    expect(openFileDialog).toHaveBeenCalledWith("newDocument");

    handlersPassed.openDocument();
    expect(openFileDialog).toHaveBeenCalledWith("openDocument");

    handlersPassed.saveDocument();
    expect(openFileDialog).toHaveBeenCalledWith("saveDocument");

    handlersPassed.saveDocumentAs();
    expect(openFileDialog).toHaveBeenCalledWith("saveDocumentAs");

    handlersPassed.openMediaDialog("image");
    expect(openMediaDialog).toHaveBeenCalledWith("image");

    handlersPassed.checkSpellingGrammar?.();
    expect(openSpellingGrammarDialog).toHaveBeenCalledOnce();

    handlersPassed.toggleTrackChanges?.();
    expect(openTrackChangesDialog).toHaveBeenCalledOnce();

    handlersPassed.openHelp?.();
    expect(openHelpDialog).toHaveBeenCalledOnce();
  });

  it("routes ribbon Save to the provided save-current action", () => {
    const saveCurrentDocument = vi.fn();
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
      openSpellingGrammarDialog,
      openTrackChangesDialog,
      openHelpDialog,
      saveCurrentDocument,
    );

    ribbon.handleRibbonItemClick({ label: "Bold", action: "toggleBold" });
    const handlersPassed = vi.mocked(executeRibbonAction).mock.calls[0]?.[2];
    handlersPassed.saveDocument();

    expect(saveCurrentDocument).toHaveBeenCalledOnce();
    expect(openFileDialog).not.toHaveBeenCalledWith("saveDocument");
  });

  it("delegates isItemActive to isRibbonItemActive", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
    );

    const active = ribbon.isItemActive({ label: "Bold", action: "toggleBold" });
    expect(isRibbonItemActive).toHaveBeenCalledWith(mockEditor, { label: "Bold", action: "toggleBold" });
    expect(active).toBe(true);
  });

  it("delegates getItemValue to getRibbonItemValue", () => {
    const ribbon = useRibbon(
      mockEditor,
      openFileDialog,
      openMediaDialog,
    );

    const val = ribbon.getItemValue({ label: "Zoom", action: "setZoom" });
    expect(val).toBe("1");
  });
});
