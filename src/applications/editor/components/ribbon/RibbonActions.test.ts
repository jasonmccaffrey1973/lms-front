import type { Editor } from "@tiptap/core";
import { describe, expect, it, vi } from "vitest";

import { executeRibbonAction, isRibbonItemActive } from "./RibbonActions";

const createHandlers = () => ({
  newDocument: vi.fn(),
  openDocument: vi.fn(),
  saveDocument: vi.fn(),
  saveDocumentAs: vi.fn(),
  openMediaDialog: vi.fn(),
});

type ChainMock = {
  focus: ReturnType<typeof vi.fn>;
  setColor: ReturnType<typeof vi.fn>;
  unsetColor: ReturnType<typeof vi.fn>;
  toggleHighlight: ReturnType<typeof vi.fn>;
  unsetHighlight: ReturnType<typeof vi.fn>;
  setParagraph: ReturnType<typeof vi.fn>;
  unsetAllMarks: ReturnType<typeof vi.fn>;
  toggleHeading: ReturnType<typeof vi.fn>;
  toggleBold: ReturnType<typeof vi.fn>;
  toggleLink: ReturnType<typeof vi.fn>;
  unsetLink: ReturnType<typeof vi.fn>;
  insertTable: ReturnType<typeof vi.fn>;
  deleteTable: ReturnType<typeof vi.fn>;
  run: ReturnType<typeof vi.fn>;
};

const createEditorWithChain = () => {
  const chain: ChainMock = {
    focus: vi.fn(),
    setColor: vi.fn(),
    unsetColor: vi.fn(),
    toggleHighlight: vi.fn(),
    unsetHighlight: vi.fn(),
    setParagraph: vi.fn(),
    unsetAllMarks: vi.fn(),
    toggleHeading: vi.fn(),
    toggleBold: vi.fn(),
    toggleLink: vi.fn(),
    unsetLink: vi.fn(),
    insertTable: vi.fn(),
    deleteTable: vi.fn(),
    run: vi.fn(),
  };

  chain.focus.mockReturnValue(chain);
  chain.setColor.mockReturnValue(chain);
  chain.unsetColor.mockReturnValue(chain);
  chain.toggleHighlight.mockReturnValue(chain);
  chain.unsetHighlight.mockReturnValue(chain);
  chain.setParagraph.mockReturnValue(chain);
  chain.unsetAllMarks.mockReturnValue(chain);
  chain.toggleHeading.mockReturnValue(chain);
  chain.toggleBold.mockReturnValue(chain);
  chain.toggleLink.mockReturnValue(chain);
  chain.unsetLink.mockReturnValue(chain);
  chain.insertTable.mockReturnValue(chain);
  chain.deleteTable.mockReturnValue(chain);

  const editor = {
    chain: vi.fn(() => chain),
    can: vi.fn(() => ({ chain: vi.fn(() => ({ focus: vi.fn(() => ({ deleteTable: vi.fn(() => ({ run: vi.fn(() => true) })) })) })) })),
    isActive: vi.fn(),
    getAttributes: vi.fn(),
  } as unknown as Editor;

  return { editor, chain };
};

describe("RibbonActions", () => {
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

  it("marks text color and highlight buttons active based on selection state", () => {
    const editor = {
      isActive: vi.fn((name: string) => name === "highlight"),
      getAttributes: vi.fn((type: string) => {
        if (type === "textStyle") {
          return { color: "#334455" };
        }

        return {};
      }),
    } as unknown as Editor;

    expect(
      isRibbonItemActive(editor, { label: "Text Color", action: "setTextColor" }),
    ).toBe(true);

    expect(
      isRibbonItemActive(editor, { label: "Highlight", action: "toggleHighlight" }),
    ).toBe(true);
  });

  it("applies style preset commands", () => {
    const { editor, chain } = createEditorWithChain();

    executeRibbonAction(
      editor,
      { label: "Styles", action: "setStyle", value: "heading_2" },
      createHandlers(),
    );

    expect(chain.toggleHeading).toHaveBeenCalledWith({ level: 2 });

    executeRibbonAction(
      editor,
      { label: "Styles", action: "setStyle", value: "normal" },
      createHandlers(),
    );

    expect(chain.setParagraph).toHaveBeenCalled();
    expect(chain.unsetAllMarks).toHaveBeenCalled();
  });

  it("applies and clears links based on URL payload", () => {
    const { editor, chain } = createEditorWithChain();

    executeRibbonAction(
      editor,
      { label: "Link", action: "toggleLink", value: "https://example.com" },
      createHandlers(),
    );

    expect(chain.toggleLink).toHaveBeenCalledWith({
      href: "https://example.com",
      target: "_blank",
    });

    executeRibbonAction(
      editor,
      { label: "Link", action: "toggleLink", value: "" },
      createHandlers(),
    );

    expect(chain.unsetLink).toHaveBeenCalled();
  });

  it("inserts a table for valid dimensions", () => {
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

  it("does not insert table for invalid dimensions", () => {
    const { editor, chain } = createEditorWithChain();

    executeRibbonAction(
      editor,
      { label: "Table", action: "insertTable", value: "0x11" },
      createHandlers(),
    );

    expect(chain.insertTable).not.toHaveBeenCalled();
  });

  it("opens media dialog for image and video insert actions", () => {
    const { editor } = createEditorWithChain();
    const handlers = createHandlers();

    executeRibbonAction(
      editor,
      { label: "Image", action: "insertImage", value: "image" },
      handlers,
    );
    expect(handlers.openMediaDialog).toHaveBeenCalledWith("image");

    executeRibbonAction(
      editor,
      { label: "Video", action: "insertVideo", value: "video" },
      handlers,
    );
    expect(handlers.openMediaDialog).toHaveBeenCalledWith("video");
  });

  it("deletes table when command is available", () => {
    const { editor, chain } = createEditorWithChain();

    executeRibbonAction(
      editor,
      { label: "Delete Table", action: "deleteTable", value: "delete_table" },
      createHandlers(),
    );

    expect(chain.deleteTable).toHaveBeenCalledOnce();
    expect(chain.run).toHaveBeenCalledOnce();
  });
});
