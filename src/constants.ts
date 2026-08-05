const STATUS_CODES = {
    400: {
        title: "Bad Request",
        displayText: "400",
        friendlyMessage: "The request could not be understood by the server.",
    },
    401: {
        title: "Unauthorized",
        displayText: "401",
        friendlyMessage: "You are not authorized to view this page.",
    },
    403: {
        title: "Forbidden",
        displayText: "403",
        friendlyMessage: "You do not have permission to view this page.",
    },
    404: {
        title: "Page Not Found",
        displayText: "404",
        friendlyMessage: "We looked for that page but cannot find it.",
    }
    
};

export default STATUS_CODES;