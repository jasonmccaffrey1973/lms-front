type UseAttachURLProps = {
    recentURLs?: string[];
    action: () => void;
};

type AttachURLProps = {
    recentURLs?: string[];
    action: () => void;
};

type UseAttachURLReturn = {
    hasRecentURLs: boolean;
    handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
    newURL: string;
    updateURL: (value: string) => void;
};

export type { UseAttachURLProps, AttachURLProps, UseAttachURLReturn };