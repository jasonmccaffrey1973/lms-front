import type { Accept, DropzoneState, FileRejection } from "react-dropzone"; 

type UploadFileStatus = "pending" | "uploading" | "success" | "error";

interface UploaderFile {
    id: string;
    file: File;
    sizeLabel: string;
    preview?: string; // object URL or data URL for image preview
    status?: UploadFileStatus;
    progress?: number; // 0 - 100
    errorMessage?: string;
}

type UploadError = { error: string; files: string[] } | undefined;

type UploadFileHandler = (
    file: File,
    onProgress: (percentage: number) => void,
    signal: AbortSignal
) => Promise<unknown>;

interface AggregateProgress {
    totalFiles: number;
    completedFiles: number;
    failedFiles: number;
    uploadingFiles: number;
    percentage: number;
}

interface UseFileUploaderOptions {
    accept?: Accept;
    maxSize?: number; // in bytes
    maxFiles?: number;
    multiple?: boolean;
    uploadFile?: UploadFileHandler;
    autoUpload?: boolean;
    onFilesChange?: (files: UploaderFile[]) => void;
    onError?: (error: UploadError) => void;
    onDropRejected?: (fileRejections: FileRejection[]) => void;
}

interface UseUploaderReturn 
    extends Pick<
        DropzoneState, 
        | "getRootProps" 
        | "getInputProps" 
        | "isDragActive" 
        | "isDragReject" 
    > { 
        files: UploaderFile[];
        removeFile: (id: string) => void;
        clearFiles: () => void;
        error: UploadError;
        clearError: () => void;
        updateFile: (id: string, updates: Partial<Omit<UploaderFile, "id" | "file">>) => void;
        uploadSingleFile: (id: string, fileOverride?: UploaderFile) => Promise<void>;
        uploadAllFiles: () => Promise<void>;
        cancelUpload: (id: string) => void;
        cancelAllUploads: () => void;
        aggregateProgress?: AggregateProgress;
        isUploading: boolean;
}

interface FileUploaderProps extends UseFileUploaderOptions {
    title?: string;
    description?: string;
    showAggregateProgress?: boolean;
}

export type {
    UploaderFile,
    UploadFileStatus,
    UploadFileHandler,
    AggregateProgress,
    UseFileUploaderOptions,
    UseUploaderReturn,
    UploadError,
    FileUploaderProps,
};