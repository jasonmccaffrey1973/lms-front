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

export default STATUS_CODES;