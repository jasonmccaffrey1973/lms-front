import type { Editor } from "@tiptap/core";
import type { RibbonMenuItem, RibbonAction, RibbonActionHandlers } from "./Ribbon.types";


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
      document.execCommand("copy");
      break;

    case "paste":
      document.execCommand("paste");
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

    case "setTextColor": {
      const color = window.prompt(
        "Enter a text color (e.g. #ff0000 or red)",
      );

      if (color) {
        chain.setColor(color).run();
      }

      break;
    }

    case "toggleHighlight": {
      const color = window.prompt(
        "Enter a highlight color (e.g. #ffff00 or yellow)",
      );

      if (color) {
        chain.toggleHighlight({ color }).run();
      }

      break;
    }

    case "setFontFamily":
      if (item.fontFamily) {
        chain.setFontFamily(item.fontFamily).run();
      }
      break;

    case "setFontSize":
      if (item.fontSize) {
        chain.setFontSize(item.fontSize).run();
      }
      break;

    case "clearFormatting":
      chain.unsetAllMarks().clearNodes().run();
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
      console.log("Insert image action");
      break;

    case "insertTable":
      console.log("Insert table action");
      break;

    // -------------------------------------------------------------------------
    // Links
    // -------------------------------------------------------------------------

    case "toggleLink": {
      const url = window.prompt("Enter a URL");

      if (url) {
        chain
          .toggleLink({
            href: url,
            target: "_blank",
          })
          .run();
      }

      break;
    }

    case "unsetLink":
      chain.unsetLink().run();
      break;

    default:
      console.log(`Ribbon item clicked: ${item.label}`);
      break;
  }
};

export { isRibbonItemActive, executeRibbonAction };