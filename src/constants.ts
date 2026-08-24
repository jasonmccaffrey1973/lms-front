/** ====================================================================================
 * Application constants for status codes and editor menu items.
 *  ==================================================================================== */

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
 * constants used for editor application ribbon items
 * ------------------------------------------------------------------------------------- */
const FILE_MENU_ITEMS = [
    {
        label: "New",
        value: "new",
    },
    {
        label: "Open",
        value: "open",
    },
    {
        label: "Save",
        value: "save",
    },
    {
        label: "Save As",
        value: "save_as",
    },
];

const HOME_MENU_ITEMS = [
    {
        label: "Copy",
        value: "copy",
    },
    {
        label: "Paste",
        value: "paste",
    },
];

const INSERT_MENU_ITEMS = [
    {
        label: "Image",
        value: "image",
    },
    {
        label: "Table",
        value: "table",
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



export { STATUS_CODES, EDITOR_TABS };