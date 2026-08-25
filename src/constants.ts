/** ====================================================================================
 * Application constants for status codes and editor menu items.
 *  ==================================================================================== */

type EditorTab =
  (typeof EDITOR_TABS)[keyof typeof EDITOR_TABS]["value"];

/** ------------------------------------------------------------------------------------
 * Status codes and their corresponding information.
 * ------------------------------------------------------------------------------------- */
const STATUS_CODES = {
    400: {
        title: "Bad Request",
        displayText: "400",
        friendlyMessage: "The request could not be understood by the server.",
        backgroundImagePath: "../../assets/images/400",
    },
    401: {
        title: "Unauthorized",
        displayText: "401",
        friendlyMessage: "You are not authorized to view this page.",
        backgroundImagePath: "../../assets/images/401",
    },
    403: {
        title: "Forbidden",
        displayText: "403",
        friendlyMessage: "You do not have permission to view this page.",
        backgroundImagePath: "../../assets/images/403",
    },
    404: {
        title: "Page Not Found",
        displayText: "404",
        friendlyMessage: "We looked for that page but cannot find it.",
        backgroundImagePath: "../../assets/images/404",
    }
    
};

/** ------------------------------------------------------------------------------------
 * Defines the order and labels of groups in the editor ribbon.
 * Each group contains related ribbon items.
 * ------------------------------------------------------------------------------------ */
const GROUP_ORDER = [
  { key: "document", label: "Document" },
  { key: "clipboard", label: "Clipboard" },
  { key: "text", label: "Text" },
  { key: "structure", label: "Structure" },
  { key: "insert", label: "Insert" },
  { key: "other", label: "More" },
] as const;

/** ------------------------------------------------------------------------------------
 * constants used for editor application ribbon items
 * ------------------------------------------------------------------------------------- */
const FILE_MENU_ITEMS = [
    {
        label: "New",
        value: "new",
        action: "newDocument",
        group: "document",
    },
    {
        label: "Open",
        value: "open",
        action: "openDocument",
        group: "document",
    },
    {
        label: "Save",
        value: "save",
        action: "saveDocument",
        group: "document",
    },
    {
        label: "Save As",
        value: "save_as",
        action: "saveDocumentAs",
        group: "document",
    },
];

const HOME_MENU_ITEMS = [
    {
        icon: "UndoSVG",
        label: "Undo",
        value: "undo",
        action: "undo",
        group: "clipboard",
    },
    {
        icon: "RedoSVG",
        label: "Redo",
        value: "redo",
        action: "redo",
        group: "clipboard",
    },
    {
        icon: "CopySVG",
        label: "Copy",
        value: "copy",
        action: "copy",
        group: "clipboard",
    },
    {
        icon: "PasteSVG",
        label: "Paste",
        value: "paste",
        action: "paste",
        group: "clipboard",
    },
    {
        icon: "BoldSVG",
        label: "Bold",
        value: "bold",
        action: "toggleBold",
        group: "text",
    },
    {
        icon: "ItalicSVG",
        label: "Italic",
        value: "italic",
        action: "toggleItalic",
        group: "text",
    },
    {
        icon: "UnderlineSVG",
        label: "Underline",
        value: "underline",
        action: "toggleUnderline",
        group: "text",
    },
    {
        icon: "TextColorSVG",
        label: "Text Color",
        value: "text_color",
        action: "setTextColor",
        group: "text",
    },
    {
        icon: "HighlightSVG",
        label: "Highlight",
        value: "highlight",
        action: "toggleHighlight",
        group: "text",
    },
    {
        label: "Arial",
        value: "font_arial",
        action: "setFontFamily",
        fontFamily: "Arial",
        group: "text",
    },
    {
        label: "Georgia",
        value: "font_georgia",
        action: "setFontFamily",
        fontFamily: "Georgia",
        group: "text",
    },
    {
        label: "14px",
        value: "size_14",
        action: "setFontSize",
        fontSize: "14px",
        group: "text",
    },
    {
        label: "18px",
        value: "size_18",
        action: "setFontSize",
        fontSize: "18px",
        group: "text",
    },
    {
        label: "24px",
        value: "size_24",
        action: "setFontSize",
        fontSize: "24px",
        group: "text",
    },
    {
        label: "Heading 1",
        value: "heading_1",
        action: "toggleHeading",
        level: 1 as const,
        group: "structure",
    },
    {
        label: "Heading 2",
        value: "heading_2",
        action: "toggleHeading",
        level: 2 as const,
        group: "structure",
    },
    {
        label: "Paragraph",
        value: "paragraph",
        action: "setParagraph",
        group: "structure",
    },
    {
        label: "Align Left",
        value: "align_left",
        action: "setTextAlignLeft",
        group: "structure",
    },
    {
        label: "Align Center",
        value: "align_center",
        action: "setTextAlignCenter",
        group: "structure",
    },
    {
        label: "Align Right",
        value: "align_right",
        action: "setTextAlignRight",
        group: "structure",
    },
    {
        label: "Link",
        value: "link",
        action: "toggleLink",
        group: "structure",
    },
    {
        label: "Unlink",
        value: "unlink",
        action: "unsetLink",
        group: "structure",
    },
    {
        label: "Bullets",
        value: "bullets",
        action: "toggleBulletList",
        group: "structure",
    },
    {
        label: "Numbered",
        value: "numbered",
        action: "toggleOrderedList",
        group: "structure",
    },
    {
        label: "Quote",
        value: "quote",
        action: "toggleBlockquote",
        group: "structure",
    },
    {
        label: "Code",
        value: "code",
        action: "toggleCodeBlock",
        group: "structure",
    },
    {
        icon: "StrikeThroughSVG",
        label: "Strike",
        value: "strike",
        action: "toggleStrike",
        group: "text",
    },
    {
        label: "Divider",
        value: "divider",
        action: "setHorizontalRule",
        group: "insert",
    },
    {
        label: "Clear",
        value: "clear",
        action: "clearFormatting",
        group: "other",
    },
];

const INSERT_MENU_ITEMS = [
    {
        label: "Divider",
        value: "divider",
        action: "setHorizontalRule",
        group: "insert",
    },
    {
        label: "Break",
        value: "break",
        action: "setHardBreak",
        group: "insert",
    },
    {
        label: "Image",
        value: "image",
        action: "insertImage",
        group: "insert",
    },
    {
        label: "Table",
        value: "table",
        action: "insertTable",
        group: "insert",
    },
];

const LAYOUT_MENU_ITEMS = [
    {
        label: "Margins",
        value: "margins",
    },
    {
        label: "Orientation",
        value: "orientation",
    },
];

const REVIEW_MENU_ITEMS = [
    {
        label: "Spelling & Grammar",
        value: "spelling_grammar",
    },
    {
        label: "Track Changes",
        value: "track_changes",
    },
];

const VIEW_MENU_ITEMS = [
    {
        label: "Zoom",
        value: "zoom",
    },
    {
        label: "Full Screen",
        value: "full_screen",
    },
];

const HELP_MENU_ITEMS = [
    {
        label: "Documentation",
        value: "documentation",
    },
    {
        label: "About",
        value: "about",
    },
];

/** ------------------------------------------------------------------------------------
 * Editor tabs - 
 * Make sure the items in each tab are defined in the corresponding menu items above
 * ------------------------------------------------------------------------------------- */
const EDITOR_TABS = {

    FILE: {
        label: "File",
        value: "file",
        items: FILE_MENU_ITEMS
    },
    HOME: {
        label: "Home",
        value: "home",
        items: HOME_MENU_ITEMS
    },
    INSERT: {
        label: "Insert",
        value: "insert",
        items: INSERT_MENU_ITEMS
    },
    LAYOUT: {
        label: "Layout",
        value: "layout",
        items: LAYOUT_MENU_ITEMS},
    REVIEW: {
        label: "Review",
        value: "review",
        items: REVIEW_MENU_ITEMS
    },
    VIEW: {
        label: "View",
        value: "view",
        items: VIEW_MENU_ITEMS
    },
    HELP: {
        label: "Help",
        value: "help",
        items: HELP_MENU_ITEMS
    }
} as const;



export { STATUS_CODES, EDITOR_TABS, GROUP_ORDER, type EditorTab };