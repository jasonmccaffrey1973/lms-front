import type { Editor } from "@tiptap/core";
import { afterEach, describe, expect, it, vi } from "vitest";

import { executeRibbonAction, isRibbonItemActive } from "./RibbonActions";
import type { RibbonAction } from "./Ribbon.types";

const createHandlers = () => ({
  newDocument: vi.fn(),
  openDocument: vi.fn(),
  saveDocument: vi.fn(),
  saveDocumentAs: vi.fn(),
  openMediaDialog: vi.fn(),
  checkSpellingGrammar: vi.fn(),
  toggleTrackChanges: vi.fn(),
  openHelp: vi.fn(),
});

type ChainMock = {
  focus: ReturnType<typeof vi.fn>;
  undo: ReturnType<typeof vi.fn>;
  redo: ReturnType<typeof vi.fn>;
  toggleBold: ReturnType<typeof vi.fn>;
  toggleItalic: ReturnType<typeof vi.fn>;
  toggleUnderline: ReturnType<typeof vi.fn>;
  toggleStrike: ReturnType<typeof vi.fn>;
  setColor: ReturnType<typeof vi.fn>;
  unsetColor: ReturnType<typeof vi.fn>;
  toggleHighlight: ReturnType<typeof vi.fn>;
  unsetHighlight: ReturnType<typeof vi.fn>;
  setFontFamily: ReturnType<typeof vi.fn>;
  setFontSize: ReturnType<typeof vi.fn>;
  setParagraph: ReturnType<typeof vi.fn>;
  unsetAllMarks: ReturnType<typeof vi.fn>;
  clearNodes: ReturnType<typeof vi.fn>;
  toggleHeading: ReturnType<typeof vi.fn>;
  toggleBulletList: ReturnType<typeof vi.fn>;
  toggleOrderedList: ReturnType<typeof vi.fn>;
  toggleBlockquote: ReturnType<typeof vi.fn>;
  toggleCodeBlock: ReturnType<typeof vi.fn>;
  setTextAlign: ReturnType<typeof vi.fn>;
  setHorizontalRule: ReturnType<typeof vi.fn>;
  setHardBreak: ReturnType<typeof vi.fn>;
  insertTable: ReturnType<typeof vi.fn>;
  deleteTable: ReturnType<typeof vi.fn>;
  toggleLink: ReturnType<typeof vi.fn>;
  unsetLink: ReturnType<typeof vi.fn>;
  insertContent: ReturnType<typeof vi.fn>;
  run: ReturnType<typeof vi.fn>;
};

const createEditorWithChain = (options?: { canDeleteTable?: boolean; selectedText?: string }) => {
  const chain: ChainMock = {
    focus: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    toggleBold: vi.fn(),
    toggleItalic: vi.fn(),
    toggleUnderline: vi.fn(),
    toggleStrike: vi.fn(),
    setColor: vi.fn(),
    unsetColor: vi.fn(),
    toggleHighlight: vi.fn(),
    unsetHighlight: vi.fn(),
    setFontFamily: vi.fn(),
    setFontSize: vi.fn(),
    setParagraph: vi.fn(),
    unsetAllMarks: vi.fn(),
    clearNodes: vi.fn(),
    toggleHeading: vi.fn(),
    toggleBulletList: vi.fn(),
    toggleOrderedList: vi.fn(),
    toggleBlockquote: vi.fn(),
    toggleCodeBlock: vi.fn(),
    setTextAlign: vi.fn(),
    setHorizontalRule: vi.fn(),
    setHardBreak: vi.fn(),
    insertTable: vi.fn(),
    deleteTable: vi.fn(),
    toggleLink: vi.fn(),
    unsetLink: vi.fn(),
    insertContent: vi.fn(),
    run: vi.fn(),
  };

  chain.focus.mockReturnValue(chain);
  chain.undo.mockReturnValue(chain);
  chain.redo.mockReturnValue(chain);
  chain.toggleBold.mockReturnValue(chain);
  chain.toggleItalic.mockReturnValue(chain);
  chain.toggleUnderline.mockReturnValue(chain);
  chain.toggleStrike.mockReturnValue(chain);
  chain.setColor.mockReturnValue(chain);
  chain.unsetColor.mockReturnValue(chain);
  chain.toggleHighlight.mockReturnValue(chain);
  chain.unsetHighlight.mockReturnValue(chain);
  chain.setFontFamily.mockReturnValue(chain);
  chain.setFontSize.mockReturnValue(chain);
  chain.setParagraph.mockReturnValue(chain);
  chain.unsetAllMarks.mockReturnValue(chain);
  chain.clearNodes.mockReturnValue(chain);
  chain.toggleHeading.mockReturnValue(chain);
  chain.toggleBulletList.mockReturnValue(chain);
  chain.toggleOrderedList.mockReturnValue(chain);
  chain.toggleBlockquote.mockReturnValue(chain);
  chain.toggleCodeBlock.mockReturnValue(chain);
  chain.setTextAlign.mockReturnValue(chain);
  chain.setHorizontalRule.mockReturnValue(chain);
  chain.setHardBreak.mockReturnValue(chain);
  chain.insertTable.mockReturnValue(chain);
  chain.deleteTable.mockReturnValue(chain);
  chain.toggleLink.mockReturnValue(chain);
  chain.unsetLink.mockReturnValue(chain);
  chain.insertContent.mockReturnValue(chain);

  const canDelete = options?.canDeleteTable ?? true;

  const editor = {
    chain: vi.fn(() => chain),
    can: vi.fn(() => ({
      chain: vi.fn(() => ({
        focus: vi.fn(() => ({
          deleteTable: vi.fn(() => ({
            run: vi.fn(() => canDelete),
          })),
        })),
      })),
    })),
    isActive: vi.fn(),
    getAttributes: vi.fn(),
    state: {
      selection: { from: 0, to: options?.selectedText ? options.selectedText.length : 0 },
      doc: {
        textBetween: vi.fn(() => options?.selectedText ?? ""),
      },
    },
  } as unknown as Editor;

  return { editor, chain };
};

describe("RibbonActions - Action Execution", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe("File / Document Actions", () => {
    it("triggers newDocument handler", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(editor, { label: "New", action: "newDocument" }, handlers);

      expect(handlers.newDocument).toHaveBeenCalledOnce();
    });

    it("triggers openDocument handler", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(editor, { label: "Open", action: "openDocument" }, handlers);

      expect(handlers.openDocument).toHaveBeenCalledOnce();
    });

    it("triggers saveDocument handler", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(editor, { label: "Save", action: "saveDocument" }, handlers);

      expect(handlers.saveDocument).toHaveBeenCalledOnce();
    });

    it("triggers saveDocumentAs handler", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(editor, { label: "Save As", action: "saveDocumentAs" }, handlers);

      expect(handlers.saveDocumentAs).toHaveBeenCalledOnce();
    });
  });

  describe("History and Clipboard Actions", () => {
    it("executes undo", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Undo", action: "undo" }, createHandlers());

      expect(chain.undo).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("executes redo", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Redo", action: "redo" }, createHandlers());

      expect(chain.redo).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("copies text using navigator.clipboard when available", async () => {
      const { editor } = createEditorWithChain({ selectedText: "Sample text" });
      const writeTextMock = vi.fn().mockResolvedValue(undefined);

      vi.stubGlobal("navigator", {
        clipboard: { writeText: writeTextMock },
      });

      executeRibbonAction(editor, { label: "Copy", action: "copy" }, createHandlers());

      expect(writeTextMock).toHaveBeenCalledWith("Sample text");
    });

    it("falls back to document.execCommand when navigator.clipboard fails", async () => {
      const { editor } = createEditorWithChain({ selectedText: "Fallback text" });
      const execCommandMock = vi.fn();

      vi.stubGlobal("navigator", {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new Error("Permission denied")),
        },
      });
      vi.stubGlobal("document", { execCommand: execCommandMock });

      executeRibbonAction(editor, { label: "Copy", action: "copy" }, createHandlers());

      // Give promise catch a microtask cycle to resolve
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(execCommandMock).toHaveBeenCalledWith("copy");
    });

    it("pastes text from navigator.clipboard into the editor", async () => {
      const { editor, chain } = createEditorWithChain();
      const readTextMock = vi.fn().mockResolvedValue("Pasted content");

      vi.stubGlobal("navigator", {
        clipboard: { readText: readTextMock },
      });

      executeRibbonAction(editor, { label: "Paste", action: "paste" }, createHandlers());

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(chain.insertContent).toHaveBeenCalledWith("Pasted content");
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("falls back to document.execCommand('paste') when clipboard readText fails", async () => {
      const { editor } = createEditorWithChain();
      const execCommandMock = vi.fn();

      vi.stubGlobal("navigator", {
        clipboard: {
          readText: vi.fn().mockRejectedValue(new Error("Denied")),
        },
      });
      vi.stubGlobal("document", { execCommand: execCommandMock });

      executeRibbonAction(editor, { label: "Paste", action: "paste" }, createHandlers());

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(execCommandMock).toHaveBeenCalledWith("paste");
    });
  });

  describe("Text Formatting Actions", () => {
    it("executes toggleBold", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Bold", action: "toggleBold" }, createHandlers());

      expect(chain.toggleBold).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("executes toggleItalic", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Italic", action: "toggleItalic" }, createHandlers());

      expect(chain.toggleItalic).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("executes toggleUnderline", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Underline", action: "toggleUnderline" }, createHandlers());

      expect(chain.toggleUnderline).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("executes toggleStrike", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Strike", action: "toggleStrike" }, createHandlers());

      expect(chain.toggleStrike).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("clears only text color when text color receives empty value", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Text Color", action: "setTextColor", value: "" },
        createHandlers(),
      );

      expect(chain.setColor).not.toHaveBeenCalled();
      expect(chain.unsetColor).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("applies text color when a color value is selected", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Text Color", action: "setTextColor", value: "#123456" },
        createHandlers(),
      );

      expect(chain.setColor).toHaveBeenCalledWith("#123456");
      expect(chain.unsetColor).not.toHaveBeenCalled();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("clears only highlight when highlight receives empty value", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Highlight", action: "toggleHighlight", value: "" },
        createHandlers(),
      );

      expect(chain.toggleHighlight).not.toHaveBeenCalled();
      expect(chain.unsetHighlight).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("applies highlight color when a color value is selected", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Highlight", action: "toggleHighlight", value: "#ffee00" },
        createHandlers(),
      );

      expect(chain.toggleHighlight).toHaveBeenCalledWith({ color: "#ffee00" });
      expect(chain.unsetHighlight).not.toHaveBeenCalled();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("applies setFontFamily with value or fontFamily prop", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Typeface", action: "setFontFamily", value: "Georgia" },
        createHandlers(),
      );

      expect(chain.setFontFamily).toHaveBeenCalledWith("Georgia");
      expect(chain.run).toHaveBeenCalledOnce();

      executeRibbonAction(
        editor,
        { label: "Typeface", action: "setFontFamily", fontFamily: "Courier New" },
        createHandlers(),
      );

      expect(chain.setFontFamily).toHaveBeenCalledWith("Courier New");
    });

    it("applies setFontSize with value or fontSize prop", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Size", action: "setFontSize", value: "18px" },
        createHandlers(),
      );

      expect(chain.setFontSize).toHaveBeenCalledWith("18px");
      expect(chain.run).toHaveBeenCalledOnce();

      executeRibbonAction(
        editor,
        { label: "Size", action: "setFontSize", fontSize: "24px" },
        createHandlers(),
      );

      expect(chain.setFontSize).toHaveBeenCalledWith("24px");
    });

    it("clears formatting by unsetting marks and clearing nodes", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Clear Formatting", action: "clearFormatting" },
        createHandlers(),
      );

      expect(chain.unsetAllMarks).toHaveBeenCalledOnce();
      expect(chain.clearNodes).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("applies style preset commands for all variants", () => {
      const { editor, chain } = createEditorWithChain();
      const handlers = createHandlers();

      // Normal
      executeRibbonAction(editor, { label: "Styles", action: "setStyle", value: "normal" }, handlers);
      expect(chain.setParagraph).toHaveBeenCalled();
      expect(chain.unsetAllMarks).toHaveBeenCalled();

      // Heading 1
      executeRibbonAction(editor, { label: "Styles", action: "setStyle", value: "heading_1" }, handlers);
      expect(chain.toggleHeading).toHaveBeenCalledWith({ level: 1 });

      // Heading 2
      executeRibbonAction(editor, { label: "Styles", action: "setStyle", value: "heading_2" }, handlers);
      expect(chain.toggleHeading).toHaveBeenCalledWith({ level: 2 });

      // Heading 3
      executeRibbonAction(editor, { label: "Styles", action: "setStyle", value: "heading_3" }, handlers);
      expect(chain.toggleHeading).toHaveBeenCalledWith({ level: 3 });

      // Strong
      executeRibbonAction(editor, { label: "Styles", action: "setStyle", value: "strong" }, handlers);
      expect(chain.toggleBold).toHaveBeenCalled();
    });
  });

  describe("Structure Actions", () => {
    it("toggles heading when level is provided", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Heading 1", action: "toggleHeading", level: 1 },
        createHandlers(),
      );

      expect(chain.toggleHeading).toHaveBeenCalledWith({ level: 1 });
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("does not toggle heading when level is missing", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Heading", action: "toggleHeading" },
        createHandlers(),
      );

      expect(chain.toggleHeading).not.toHaveBeenCalled();
    });

    it("sets paragraph", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Paragraph", action: "setParagraph" }, createHandlers());

      expect(chain.setParagraph).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("toggles bullet list", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Bullets", action: "toggleBulletList" }, createHandlers());

      expect(chain.toggleBulletList).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("toggles ordered list", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Numbered", action: "toggleOrderedList" }, createHandlers());

      expect(chain.toggleOrderedList).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("toggles blockquote", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Quote", action: "toggleBlockquote" }, createHandlers());

      expect(chain.toggleBlockquote).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("toggles code block", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Code", action: "toggleCodeBlock" }, createHandlers());

      expect(chain.toggleCodeBlock).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });
  });

  describe("Alignment Actions", () => {
    it("sets text align left", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Align Left", action: "setTextAlignLeft" }, createHandlers());

      expect(chain.setTextAlign).toHaveBeenCalledWith("left");
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("sets text align center", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Align Center", action: "setTextAlignCenter" }, createHandlers());

      expect(chain.setTextAlign).toHaveBeenCalledWith("center");
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("sets text align right", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Align Right", action: "setTextAlignRight" }, createHandlers());

      expect(chain.setTextAlign).toHaveBeenCalledWith("right");
      expect(chain.run).toHaveBeenCalledOnce();
    });
  });

  describe("Insert Actions", () => {
    it("inserts horizontal rule / divider", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Divider", action: "setHorizontalRule" }, createHandlers());

      expect(chain.setHorizontalRule).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("inserts hard break", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Break", action: "setHardBreak" }, createHandlers());

      expect(chain.setHardBreak).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("opens media dialog for image and video", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(editor, { label: "Image", action: "insertImage" }, handlers);
      expect(handlers.openMediaDialog).toHaveBeenCalledWith("image");

      executeRibbonAction(editor, { label: "Video", action: "insertVideo" }, handlers);
      expect(handlers.openMediaDialog).toHaveBeenCalledWith("video");
    });

    it("inserts table for valid dimensions", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(
        editor,
        { label: "Table", action: "insertTable", value: "3x4" },
        createHandlers(),
      );

      expect(chain.insertTable).toHaveBeenCalledWith({
        rows: 3,
        cols: 4,
        withHeaderRow: false,
      });
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("does not insert table for invalid dimensions or missing value", () => {
      const { editor, chain } = createEditorWithChain();

      executeRibbonAction(editor, { label: "Table", action: "insertTable", value: "0x11" }, createHandlers());
      executeRibbonAction(editor, { label: "Table", action: "insertTable", value: "invalid" }, createHandlers());
      executeRibbonAction(editor, { label: "Table", action: "insertTable" }, createHandlers());

      expect(chain.insertTable).not.toHaveBeenCalled();
    });

    it("deletes table when can() returns true", () => {
      const { editor, chain } = createEditorWithChain({ canDeleteTable: true });

      executeRibbonAction(editor, { label: "Delete Table", action: "deleteTable" }, createHandlers());

      expect(chain.deleteTable).toHaveBeenCalledOnce();
      expect(chain.run).toHaveBeenCalledOnce();
    });

    it("does not delete table when can() returns false", () => {
      const { editor, chain } = createEditorWithChain({ canDeleteTable: false });

      executeRibbonAction(editor, { label: "Delete Table", action: "deleteTable" }, createHandlers());

      expect(chain.deleteTable).not.toHaveBeenCalled();
    });
  });

  describe("Link Actions", () => {
    it("applies and unsets link depending on value", () => {
      const { editor, chain } = createEditorWithChain();

      // Setting link
      executeRibbonAction(
        editor,
        { label: "Link", action: "toggleLink", value: "https://example.com" },
        createHandlers(),
      );

      expect(chain.toggleLink).toHaveBeenCalledWith({
        href: "https://example.com",
        target: "_blank",
      });

      // Clearing link via toggleLink with empty value
      executeRibbonAction(
        editor,
        { label: "Link", action: "toggleLink", value: "" },
        createHandlers(),
      );

      expect(chain.unsetLink).toHaveBeenCalled();

      // Explicit unsetLink action
      executeRibbonAction(
        editor,
        { label: "Unlink", action: "unsetLink" },
        createHandlers(),
      );

      expect(chain.unsetLink).toHaveBeenCalledTimes(2);
    });
  });

  describe("Review and Help Actions", () => {
    it("triggers checkSpellingGrammar handler", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(
        editor,
        { label: "Spelling & Grammar", action: "checkSpellingGrammar" },
        handlers,
      );

      expect(handlers.checkSpellingGrammar).toHaveBeenCalledOnce();
    });

    it("triggers toggleTrackChanges handler", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(
        editor,
        { label: "Track Changes", action: "toggleTrackChanges" },
        handlers,
      );

      expect(handlers.toggleTrackChanges).toHaveBeenCalledOnce();
    });

    it("triggers openHelp handler", () => {
      const { editor } = createEditorWithChain();
      const handlers = createHandlers();

      executeRibbonAction(editor, { label: "Help", action: "openHelp" }, handlers);

      expect(handlers.openHelp).toHaveBeenCalledOnce();
    });

    it("handles fallback default action without throwing", () => {
      const { editor } = createEditorWithChain();
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      executeRibbonAction(
        editor,
        { label: "Custom Item", action: "unknownAction" as unknown as RibbonAction },
        createHandlers(),
      );

      expect(consoleSpy).toHaveBeenCalledWith("Ribbon item clicked: Custom Item");
    });
  });
});

describe("RibbonActions - isRibbonItemActive State Reflection", () => {
  it("returns false if editor is null", () => {
    expect(isRibbonItemActive(null, { label: "Bold", action: "toggleBold" })).toBe(false);
  });

  it("checks bold, italic, underline, strike active states", () => {
    const editor = {
      isActive: vi.fn((name: string) => name === "bold" || name === "underline"),
      getAttributes: vi.fn(() => ({})),
    } as unknown as Editor;

    expect(isRibbonItemActive(editor, { label: "Bold", action: "toggleBold" })).toBe(true);
    expect(isRibbonItemActive(editor, { label: "Italic", action: "toggleItalic" })).toBe(false);
    expect(isRibbonItemActive(editor, { label: "Underline", action: "toggleUnderline" })).toBe(true);
    expect(isRibbonItemActive(editor, { label: "Strike", action: "toggleStrike" })).toBe(false);
  });

  it("checks heading active state based on level", () => {
    const editor = {
      isActive: vi.fn((name: string, attrs?: { level?: number }) => name === "heading" && attrs?.level === 2),
      getAttributes: vi.fn(() => ({})),
    } as unknown as Editor;

    expect(isRibbonItemActive(editor, { label: "H2", action: "toggleHeading", level: 2 })).toBe(true);
    expect(isRibbonItemActive(editor, { label: "H1", action: "toggleHeading", level: 1 })).toBe(false);
    expect(isRibbonItemActive(editor, { label: "H", action: "toggleHeading" })).toBe(false);
  });

  it("checks list, quote, and codeblock active states", () => {
    const editor = {
      isActive: vi.fn((name: string) => name === "bulletList" || name === "codeBlock"),
      getAttributes: vi.fn(() => ({})),
    } as unknown as Editor;

    expect(isRibbonItemActive(editor, { label: "Bullets", action: "toggleBulletList" })).toBe(true);
    expect(isRibbonItemActive(editor, { label: "Numbered", action: "toggleOrderedList" })).toBe(false);
    expect(isRibbonItemActive(editor, { label: "Quote", action: "toggleBlockquote" })).toBe(false);
    expect(isRibbonItemActive(editor, { label: "Code", action: "toggleCodeBlock" })).toBe(true);
  });

  it("checks table active state for deleteTable", () => {
    const editor = {
      isActive: vi.fn((name: string) => name === "table"),
      getAttributes: vi.fn(() => ({})),
    } as unknown as Editor;

    expect(isRibbonItemActive(editor, { label: "Delete Table", action: "deleteTable" })).toBe(true);
  });

  it("checks text alignment active state", () => {
    const editor = {
      isActive: vi.fn(
        (opts: string | Record<string, unknown>) =>
          typeof opts === "object" && opts !== null && opts.textAlign === "center",
      ),
      getAttributes: vi.fn(() => ({})),
    } as unknown as Editor;

    expect(isRibbonItemActive(editor, { label: "Left", action: "setTextAlignLeft" })).toBe(false);
    expect(isRibbonItemActive(editor, { label: "Center", action: "setTextAlignCenter" })).toBe(true);
    expect(isRibbonItemActive(editor, { label: "Right", action: "setTextAlignRight" })).toBe(false);
  });

  it("checks link active state", () => {
    const editor = {
      isActive: vi.fn((name: string) => name === "link"),
      getAttributes: vi.fn(() => ({})),
    } as unknown as Editor;

    expect(isRibbonItemActive(editor, { label: "Link", action: "toggleLink" })).toBe(true);
  });

  it("returns false for unsupported actions in isRibbonItemActive", () => {
    const editor = {
      isActive: vi.fn(() => true),
      getAttributes: vi.fn(() => ({})),
    } as unknown as Editor;

    expect(isRibbonItemActive(editor, { label: "New", action: "newDocument" })).toBe(false);
  });
});
