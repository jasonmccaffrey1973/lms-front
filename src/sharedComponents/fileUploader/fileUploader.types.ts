import type { Accept, DropzoneState, FileRejection } from "react-dropzone"; 
import type { SVGProps } from "react";

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

type DuplicateStrategy = "skip" | "keepBoth" | "replace";

interface ImageOptimizationOptions {
    /** Whether to enable client-side canvas optimization */
    enabled?: boolean;
    /** Maximum image width in pixels. Default: 2048 */
    maxWidth?: number;
    /** Maximum image height in pixels. Default: 2048 */
    maxHeight?: number;
    /** Output quality from 0.1 to 1.0 (default: 0.85, visually lossless) */
    quality?: number;
    /** Desired MIME type format. Defaults to preserving original format (or image/jpeg if unsupported) */
    format?: "image/jpeg" | "image/webp" | "image/png";
    /** If true, only generates a downscaled preview thumbnail and keeps the uploaded raw file untouched */
    thumbnailOnly?: boolean;
}

interface UseFileUploaderOptions {
    accept?: Accept;
    maxSize?: number; // in bytes
    maxFiles?: number;
    multiple?: boolean;
    uploadFile?: UploadFileHandler;
    autoUpload?: boolean;
    duplicateStrategy?: DuplicateStrategy;
    sanitizeFilename?: (fileName: string) => string;
    imageOptimization?: ImageOptimizationOptions;
    /** Called once when every staged file has uploaded successfully. */
    onAllUploadsComplete?: () => void;
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

type UploaderTypeIconProps = SVGProps<SVGSVGElement> & {
  title: string;
};

export type {
    UploaderFile,
    UploadFileStatus,
    DuplicateStrategy,
    ImageOptimizationOptions,
    UploadFileHandler,
    AggregateProgress,
    UseFileUploaderOptions,
    UseUploaderReturn,
    UploadError,
    FileUploaderProps,
    UploaderTypeIconProps,
};
