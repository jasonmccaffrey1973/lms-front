import type { EditorTab } from "./constants/types";

/** ====================================================================================
 * Application constants for status codes and editor menu items.
 *  ==================================================================================== */

// Extracted to types.ts

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
    { key: "layout", label: "Page Layout" },
    { key: "review", label: "Review" },
    { key: "view", label: "View" },
    { key: "help", label: "Help" },
    { key: "other", label: "More" },
] as const;

/** ------------------------------------------------------------------------------------
 * Defines the available typeface options for the editor.
 * ------------------------------------------------------------------------------------ */
const TYPEFACE_OPTIONS = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
];

/** ------------------------------------------------------------------------------------
 * Defines the available type sizes for the editor.
 *  ------------------------------------------------------------------------------------ */
const TYPE_SIZES = [
    { label: "9px", value: "9px" },
    { label: "10px", value: "10px" },
    { label: "12px", value: "12px" },
    { label: "14px", value: "14px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "24px", value: "24px" },
    { label: "32px", value: "32px" },
    { label: "48px", value: "48px" },
    { label: "64px", value: "64px" },
    { label: "72px", value: "72px" },
];

/** ------------------------------------------------------------------------------------
 * constants used for editor application ribbon items
 * ------------------------------------------------------------------------------------- */
const FILE_MENU_ITEMS = [
    {
        label: "New",
        value: "new",
        action: "newDocument",
        group: "document",
        icon: "document",
    },
    {
        label: "Open",
        value: "open",
        action: "openDocument",
        group: "document",
        icon: "open",
    },
    {
        label: "Save",
        value: "save",
        action: "saveDocument",
        group: "document",
        icon: "save",
    },
    {
        label: "Save As",
        value: "save_as",
        action: "saveDocumentAs",
        group: "document",
        icon: "saveas",
    },
];

const STYLES_MENU_ITEMS = [
    {
        label: "Normal",
        value: "normal",
        action: "setStyle",
    },
    {
        label: "Heading 1",
        value: "heading_1",
        action: "setStyle",
    },
    {
        label: "Heading 2",
        value: "heading_2",
        action: "setStyle",
    },
    {
        label: "Heading 3",
        value: "heading_3",
        action: "setStyle",
    },
    {
        label: "Strong",
        value: "strong",
        action: "setStyle",
    },
];



const HOME_MENU_ITEMS = [
    {
        icon: "undo",
        label: "Undo",
        value: "undo",
        action: "undo",
        group: "clipboard",
    },
    {
        icon: "redo",
        label: "Redo",
        value: "redo",
        action: "redo",
        group: "clipboard",
    },
    {
        icon: "copy",
        label: "Copy",
        value: "copy",
        action: "copy",
        group: "clipboard",
    },
    {
        icon: "paste",
        label: "Paste",
        value: "paste",
        action: "paste",
        group: "clipboard",
    },
    {
        icon: "bold",
        label: "Bold",
        value: "bold",
        action: "toggleBold",
        group: "text",
    },
    {
        icon: "italic",
        label: "Italic",
        value: "italic",
        action: "toggleItalic",
        group: "text",
    },
    {
        icon: "underline",
        label: "Underline",
        value: "underline",
        action: "toggleUnderline",
        group: "text",
    },
    {
        icon: "textcolor",
        label: "Text Color",
        value: "text_color",
        elementType: "buttonDropdown",
        action: "setTextColor",
        group: "text",
    },
    {
        icon: "strikethrough",
        label: "Strike",
        value: "strike",
        action: "toggleStrike",
        group: "text",
    },
    {
        icon: "highlight",
        label: "Highlight",
        value: "highlight",
        elementType: "buttonDropdown",
        action: "toggleHighlight",
        group: "text",
    },
    {
        label: "Typeface",
        value: "typeface_select",
        action: "setFontFamily",
        elementType: "select",
        options: TYPEFACE_OPTIONS,
        group: "text",
    },
    {
        label: "Size",
        value: "type_size",
        action: "setFontSize",
        elementType: "select",
        options: TYPE_SIZES,
        group: "text",
    },
    {
        label: "Styles",
        elementType: "list",
        items: STYLES_MENU_ITEMS,
        group: "structure",
    },
    {
        label: "Paragraph",
        value: "paragraph",
        action: "setParagraph",
        group: "structure",
        icon: "paragraph",
    },
    {
        label: "Align Left",
        value: "align_left",
        action: "setTextAlignLeft",
        group: "structure",
        icon: "alignleft",
    },
    {
        label: "Align Center",
        value: "align_center",
        action: "setTextAlignCenter",
        group: "structure",
        icon: "aligncenter",
    },
    {
        label: "Align Right",
        value: "align_right",
        action: "setTextAlignRight",
        group: "structure",
        icon: "alignright",
    },
    {
        label: "Link",
        value: "link",
        elementType: "buttonDropdown",
        action: "toggleLink",
        group: "structure",
        icon: "link",
    },
    {
        label: "Unlink",
        value: "unlink",
        action: "unsetLink",
        group: "structure",
        icon: "unlink",
    },
    {
        label: "Bullets",
        value: "bullets",
        action: "toggleBulletList",
        group: "structure",
        icon: "bulletedlist",
    },
    {
        label: "Numbered",
        value: "numbered",
        action: "toggleOrderedList",
        group: "structure",
        icon: "numberedlist",
    },
    {
        label: "Quote",
        value: "quote",
        action: "toggleBlockquote",
        group: "structure",
        icon: "quote",
    },
    {
        label: "Code",
        value: "code",
        action: "toggleCodeBlock",
        group: "structure",
        icon: "code",
    },
    // {
    //     label: "Divider",
    //     value: "divider",
    //     action: "setHorizontalRule",
    //     group: "insert",
    //     icon: "divider",

    // },
    // {
    //     label: "Clear",
    //     value: "clear",
    //     action: "clearFormatting",
    //     group: "other",
    //     icon: "clearformatting",
    // },
];

const INSERT_MENU_ITEMS = [
    {
        label: "Divider",
        value: "divider",
        action: "setHorizontalRule",
        group: "insert",
        icon: "divider",
    },
    {
        label: "Break",
        value: "break",
        action: "setHardBreak",
        group: "insert",
        icon: "break",

    },
    {
        label: "Image",
        value: "image",
        action: "insertImage",
        group: "insert",
        icon: "image",
    },
    {
        label: "Video",
        value: "video",
        action: "insertVideo",
        group: "insert",
        icon: "video",
    },
    {
        label: "Table",
        value: "table",
        action: "insertTable",
        group: "insert",
        icon: "table",
    },
];

const LAYOUT_MENU_ITEMS = [
    {
        label: "Margins",
        value: "margins",
        action: "setMargins",
        group: "layout",
        icon: "margins",
    },
    {
        label: "Orientation",
        value: "orientation",
        action: "setOrientation",
        group: "layout",
        icon: "orientation",
    },
];

const REVIEW_MENU_ITEMS = [
    {
        label: "Spelling & Grammar",
        value: "spelling_grammar",
        action: "checkSpellingGrammar",
        group: "review",
        icon: "spellcheck",
    },
    {
        label: "Track Changes",
        value: "track_changes",
        action: "toggleTrackChanges",
        group: "review",
        icon: "changes",
    },
];

const VIEW_MENU_ITEMS = [
    {
        label: "Zoom",
        value: "zoom",
        action: "setZoom",
        group: "view",
        icon: "zoom",
    },
    {
        label: "Full Screen",
        value: "full_screen",
        action: "toggleFullScreen",
        group: "view",
        icon: "fullscreen",
    },
];

const HELP_MENU_ITEMS = [
    {
        label: "Help",
        value: "help",
        action: "openHelp",
        group: "help",
        icon: "help",
    },
    {
        label: "About",
        value: "about",
        action: "openAbout",
        group: "help",
        icon: "about",
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



export { STATUS_CODES, EDITOR_TABS, GROUP_ORDER, TYPE_SIZES, type EditorTab };