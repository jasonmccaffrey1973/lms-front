import type { Editor } from "@tiptap/core";
import type { RibbonMenuItem, RibbonAction, RibbonActionHandlers } from "./Ribbon.types";

const copyToClipboard = async (editor: Editor) => {
  const selection = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(selection.from, selection.to, "\n");
  const fallbackText = window.getSelection?.()?.toString() ?? "";
  const text = selectedText || fallbackText;

  if (!text) {
    return;
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to legacy API when Clipboard permission is denied.
    }
  }

  document.execCommand("copy");
};

const pasteFromClipboard = async (editor: Editor) => {
  if (navigator.clipboard?.readText) {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        editor.chain().focus().insertContent(text).run();
        return;
      }
    } catch {
      // Fall through to legacy API when Clipboard permission is denied.
    }
  }

  document.execCommand("paste");
};

const parseTableDimensions = (value?: string): { rows: number; cols: number } | null => {
  if (!value) {
    return null;
  }

  const match = value.match(/^(\d{1,2})x(\d{1,2})$/i);
  if (!match) {
    return null;
  }

  const rows = Number(match[1]);
  const cols = Number(match[2]);

  if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
    return null;
  }

  if (rows < 1 || rows > 10 || cols < 1 || cols > 10) {
    return null;
  }

  return { rows, cols };
};


/**
 * Determines whether a ribbon item is currently active in the editor.
 */
const isRibbonItemActive = (
  editor: Editor | null,
  item: RibbonMenuItem,
): boolean => {
  if (!editor) {
    return false;
  }

  switch (item.action as RibbonAction) {
    // Text formatting
    case "toggleBold":
      return editor.isActive("bold");

    case "toggleItalic":
      return editor.isActive("italic");

    case "toggleUnderline":
      return editor.isActive("underline");

    case "toggleStrike":
      return editor.isActive("strike");

    case "setTextColor":
      return Boolean(editor.getAttributes("textStyle")?.color);

    case "toggleHighlight":
      return editor.isActive("highlight");

    // Structure
    case "toggleHeading":
      return item.level
        ? editor.isActive("heading", { level: item.level })
        : false;

    case "toggleBulletList":
      return editor.isActive("bulletList");

    case "toggleOrderedList":
      return editor.isActive("orderedList");

    case "toggleBlockquote":
      return editor.isActive("blockquote");

    case "toggleCodeBlock":
      return editor.isActive("codeBlock");

    case "deleteTable":
      return editor.isActive("table");

    // Alignment
    case "setTextAlignLeft":
      return editor.isActive({ textAlign: "left" });

    case "setTextAlignCenter":
      return editor.isActive({ textAlign: "center" });

    case "setTextAlignRight":
      return editor.isActive({ textAlign: "right" });

    // Links
    case "toggleLink":
      return editor.isActive("link");

    default:
      return false;
  }
};

/** ------------------------------------------------------------------------------
 * Executes the action associated with a ribbon item.
 ** ------------------------------------------------------------------------------ */
const executeRibbonAction = (
  editor: Editor,
  item: RibbonMenuItem,
  handlers: RibbonActionHandlers,
): void => {
  const chain = editor.chain().focus();

  switch (item.action as RibbonAction) {
    // -------------------------------------------------------------------------
    // Document
    // -------------------------------------------------------------------------

    case "newDocument":
      handlers.newDocument();
      break;

    case "openDocument":
      handlers.openDocument();
      break;

    case "saveDocument":
      handlers.saveDocument();
      break;

    case "saveDocumentAs":
      handlers.saveDocumentAs();
      break;

    // -------------------------------------------------------------------------
    // Clipboard / history
    // -------------------------------------------------------------------------

    case "undo":
      chain.undo().run();
      break;

    case "redo":
      chain.redo().run();
      break;

    case "copy":
      void copyToClipboard(editor);
      break;

    case "paste":
      void pasteFromClipboard(editor);
      break;

    // -------------------------------------------------------------------------
    // Text formatting
    // -------------------------------------------------------------------------

    case "toggleBold":
      chain.toggleBold().run();
      break;

    case "toggleItalic":
      chain.toggleItalic().run();
      break;

    case "toggleUnderline":
      chain.toggleUnderline().run();
      break;

    case "toggleStrike":
      chain.toggleStrike().run();
      break;

    case "setTextColor":
      if (item.value && item.value.trim() !== "") {
        chain.setColor(item.value).run();
      } else {
        chain.unsetColor().run();
      }
      break;

    case "toggleHighlight":
      if (item.value && item.value.trim() !== "") {
        chain.toggleHighlight({ color: item.value }).run();
      } else {
        chain.unsetHighlight().run();
      }
      break;

    case "setFontFamily":
      if (item.value || item.fontFamily) {
        chain.setFontFamily(item.value || item.fontFamily || "").run();
      }
      break;

    case "setFontSize":
      if (item.value || item.fontSize) {
        chain.setFontSize(item.value || item.fontSize || "").run();
      }
      break;

    case "clearFormatting":
      chain.unsetAllMarks().clearNodes().run();
      break;

    case "setStyle":
      switch (item.value) {
        case "normal":
          chain.setParagraph().unsetAllMarks().run();
          break;
        case "heading_1":
          chain.toggleHeading({ level: 1 }).run();
          break;
        case "heading_2":
          chain.toggleHeading({ level: 2 }).run();
          break;
        case "heading_3":
          chain.toggleHeading({ level: 3 }).run();
          break;
        case "strong":
          chain.toggleBold().run();
          break;
        default:
          break;
      }
      break;

    // -------------------------------------------------------------------------
    // Structure
    // -------------------------------------------------------------------------

    case "toggleHeading":
      if (item.level) {
        chain.toggleHeading({ level: item.level }).run();
      }
      break;

    case "setParagraph":
      chain.setParagraph().run();
      break;

    case "toggleBulletList":
      chain.toggleBulletList().run();
      break;

    case "toggleOrderedList":
      chain.toggleOrderedList().run();
      break;

    case "toggleBlockquote":
      chain.toggleBlockquote().run();
      break;

    case "toggleCodeBlock":
      chain.toggleCodeBlock().run();
      break;

    // -------------------------------------------------------------------------
    // Alignment
    // -------------------------------------------------------------------------

    case "setTextAlignLeft":
      chain.setTextAlign("left").run();
      break;

    case "setTextAlignCenter":
      chain.setTextAlign("center").run();
      break;

    case "setTextAlignRight":
      chain.setTextAlign("right").run();
      break;

    // -------------------------------------------------------------------------
    // Insert
    // -------------------------------------------------------------------------

    case "setHorizontalRule":
      chain.setHorizontalRule().run();
      break;

    case "setHardBreak":
      chain.setHardBreak().run();
      break;

    case "insertImage":
      handlers.openMediaDialog("image");
      break;

    case "insertVideo":
      handlers.openMediaDialog("video");
      break;

    case "insertTable":
      {
        const dimensions = parseTableDimensions(item.value);
        if (!dimensions) {
          break;
        }

        chain
          .insertTable({
            rows: dimensions.rows,
            cols: dimensions.cols,
            withHeaderRow: false,
          })
          .run();
      }
      break;

    case "deleteTable":
      if (editor.can().chain().focus().deleteTable().run()) {
        chain.deleteTable().run();
      }
      break;

    // -------------------------------------------------------------------------
    // Links
    // -------------------------------------------------------------------------

    case "toggleLink":
      if (item.value) {
        chain
          .toggleLink({
            href: item.value,
            target: "_blank",
          })
          .run();
      } else {
        chain.unsetLink().run();
      }
      break;

    case "unsetLink":
      chain.unsetLink().run();
      break;

    default:
      console.log(`Ribbon item clicked: ${item.label}`);
      break;
  }
};

export { isRibbonItemActive, executeRibbonAction };