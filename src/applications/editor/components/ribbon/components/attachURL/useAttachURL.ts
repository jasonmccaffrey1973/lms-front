import { useState } from "react";
import type {
    UseAttachURLProps,
    UseAttachURLReturn,
} from "./AttachURL.types";

const useAttachURL = ({
    recentURLs,
    action,
}: UseAttachURLProps): UseAttachURLReturn => {
    const hasRecentURLs =
        recentURLs && Array.isArray(recentURLs) && recentURLs.length > 0
            ? true
            : false;

    const [newURL, setNewURL] = useState("");

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        action();
    };

    const updateURL = (value: string) => {
        setNewURL(value);
    };

    return {
        hasRecentURLs,
        handleSubmit,
        newURL,
        updateURL,
    };
};

export default useAttachURL;