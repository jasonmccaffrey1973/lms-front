type UseAttachURLProps = {
    recentURLs?: string[];
    action: (url: string) => void;
};

type AttachURLProps = {
    recentURLs?: string[];
    action: (url: string) => void;
};

type UseAttachURLReturn = {
    hasRecentURLs: boolean;
    handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
    newURL: string;
    updateURL: (value: string) => void;
};

export type { UseAttachURLProps, AttachURLProps, UseAttachURLReturn };