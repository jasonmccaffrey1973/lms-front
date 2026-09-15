import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";

import type {
    UploaderFile,
    UseFileUploaderOptions,
    UseUploaderReturn,
    UploadError,
} from "./fileUploader.types"; 
    
/** -----------------------------------------------------------------------------------------------------------
 * Formats a file size in bytes into a human-readable string (e.g., '1.24 MB').
 * ----------------------------------------------------------------------------------------------------------- */
const formatFileSize = (bytes: number): string => {
     if (bytes === 0) { 
        return "0 Bytes"; 
    }

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const index = Math.floor( Math.log(bytes) / Math.log(1024) );
        
    return `${parseFloat( (bytes / Math.pow(1024, index)).toFixed(2) )} ${units[index]}`; 
};

/** -----------------------------------------------------------------------------------------------------------
 * Revokes a blob/object URL preview to free up browser memory.
 * ----------------------------------------------------------------------------------------------------------- */
const revokeFilePreview = (file?: UploaderFile) => {
    if (file?.preview && file.preview.startsWith("blob:")) {
        URL.revokeObjectURL(file.preview);
    }
};

/** -----------------------------------------------------------------------------------------------------------
 * Custom hook that manages file drag-and-drop, validation, deduplication,
 * thumbnail preview generation, and object URL memory cleanup.
 *
 * @param options - Configuration for dropzone constraints (accept, maxSize, maxFiles, multiple) and event callbacks.
 * @returns Dropzone bindings, current files list, error state, and file management functions.
 * ----------------------------------------------------------------------------------------------------------- */
const useFileUploader = (options: UseFileUploaderOptions = {}): UseUploaderReturn => {
    const {
        accept,
        maxSize,
        maxFiles,
        multiple = true,
        uploadFile,
        autoUpload = false,
        onFilesChange,
        onError,
        onDropRejected,
    } = options;

    const [files, setFiles] = useState<UploaderFile[]>([]);
    const [error, setError] = useState<UploadError>(undefined);
    const filesRef = useRef<UploaderFile[]>([]);
    const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

    /** -----------------------------------------------------------------------------------------------------------
     * Synchronize ref with latest files outside of render phase
     * and notify parent component via onFilesChange callback.
     ** ----------------------------------------------------------------------------------------------------------- */
    useEffect(() => {
        filesRef.current = files;
        onFilesChange?.(files);
    }, [files, onFilesChange]);

    /** -----------------------------------------------------------------------------------------------------------
     * Cleanup all active object URLs and abort ongoing uploads when the component unmounts.
     ** ----------------------------------------------------------------------------------------------------------- */
    useEffect(() => {
        return () => {
            filesRef.current.forEach(revokeFilePreview);
            abortControllersRef.current.forEach((controller) => controller.abort());
            abortControllersRef.current.clear();
        };
    }, []);

    /** -----------------------------------------------------------------------------------------------------------
     * Updates internal error state and notifies the parent onError callback if provided.
     ** ----------------------------------------------------------------------------------------------------------- */
    const updateError = useCallback(
        (newError: UploadError) => {
            setError(newError);
            onError?.(newError);
        },
        [onError]
    );

    /** -----------------------------------------------------------------------------------------------------------
     * Updates an individual file's status, progress, or other metadata.
     ** ----------------------------------------------------------------------------------------------------------- */
    const updateFile = useCallback((id: string, updates: Partial<Omit<UploaderFile, "id" | "file">>) => {
        setFiles((currentFiles) =>
            currentFiles.map((f) => (f.id === id ? { ...f, ...updates } : f))
        );
    }, []);

    /** -----------------------------------------------------------------------------------------------------------
     * Cancels an ongoing upload for a specific file using its AbortController.
     ** ----------------------------------------------------------------------------------------------------------- */
    const cancelUpload = useCallback((id: string) => {
        const controller = abortControllersRef.current.get(id);
        if (controller) {
            controller.abort();
            abortControllersRef.current.delete(id);
            updateFile(id, {
                status: "error",
                errorMessage: "Upload cancelled",
            });
        }
    }, [updateFile]);

    /** -----------------------------------------------------------------------------------------------------------
     * Cancels all active file uploads.
     ** ----------------------------------------------------------------------------------------------------------- */
    const cancelAllUploads = useCallback(() => {
        abortControllersRef.current.forEach((controller, id) => {
            controller.abort();
            updateFile(id, {
                status: "error",
                errorMessage: "Upload cancelled",
            });
        });
        abortControllersRef.current.clear();
    }, [updateFile]);

    /** -----------------------------------------------------------------------------------------------------------
     * Uploads an individual file using the provided uploadFile handler.
     * Manages progress, cancellation via AbortController, and retry/error state.
     ** ----------------------------------------------------------------------------------------------------------- */
    const uploadSingleFile = useCallback(
        async (id: string, fileOverride?: UploaderFile): Promise<void> => {
            if (!uploadFile) return;

            // Use the provided override (e.g. during auto-upload before filesRef is synced),
            // otherwise fall back to the ref which is kept in sync via useEffect.
            const targetFile = fileOverride ?? filesRef.current.find((f) => f.id === id);
            if (!targetFile) return;

            // Abort previous controller if already running
            if (abortControllersRef.current.has(id)) {
                abortControllersRef.current.get(id)?.abort();
            }

            const controller = new AbortController();
            abortControllersRef.current.set(id, controller);

            updateFile(id, {
                status: "uploading",
                progress: 0,
                errorMessage: undefined,
            });

            try {
                await uploadFile(
                    targetFile.file,
                    (progress: number) => {
                        updateFile(id, { progress: Math.min(Math.max(progress, 0), 100) });
                    },
                    controller.signal
                );

                abortControllersRef.current.delete(id);
                updateFile(id, {
                    status: "success",
                    progress: 100,
                    errorMessage: undefined,
                });
            } catch (err: unknown) {
                if (controller.signal.aborted) {
                    // Handled in cancelUpload or explicit abort
                    return;
                }

                abortControllersRef.current.delete(id);
                const errorMessage = err instanceof Error ? err.message : "Upload failed";
                updateFile(id, {
                    status: "error",
                    errorMessage,
                });
            }
        },
        [uploadFile, updateFile]
    );

    /** -----------------------------------------------------------------------------------------------------------
     * Triggers uploads for all files that are currently pending or failed.
     ** ----------------------------------------------------------------------------------------------------------- */
    const uploadAllFiles = useCallback(async (): Promise<void> => {
        if (!uploadFile) return;

        const filesToUpload = filesRef.current.filter(
            (f) => f.status === undefined || f.status === "pending" || f.status === "error"
        );

        await Promise.allSettled(filesToUpload.map((f) => uploadSingleFile(f.id)));
    }, [uploadFile, uploadSingleFile]);

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            updateError(undefined);

            // Build the accepted/duplicate lists before calling setFiles so we can
            // reference them both for the state update AND for auto-upload without a
            // separate ref sync cycle.
            const existingKeys = new Set(filesRef.current.map((f) => `${f.file.name}::${f.file.size}`));
            const accepted: UploaderFile[] = [];
            const duplicates: string[] = [];

            for (const file of acceptedFiles) {
                const key = `${file.name}::${file.size}`;
                if (existingKeys.has(key)) {
                    duplicates.push(file.name);
                    continue;
                }
                existingKeys.add(key);

                const id = crypto.randomUUID();
                const isImage = file.type ? file.type.startsWith("image/") : false;
                const preview = isImage ? URL.createObjectURL(file) : undefined;

                accepted.push({
                    id,
                    file,
                    sizeLabel: formatFileSize(file.size),
                    preview,
                    status: uploadFile ? "pending" : undefined,
                    progress: uploadFile ? 0 : undefined,
                });
            }

            if (duplicates.length > 0) {
                updateError({
                    error: `${duplicates.length} duplicate file${duplicates.length === 1 ? "" : "s"} skipped`,
                    files: duplicates,
                });
            }

            if (accepted.length === 0) return;

            // Pure state updater — no side effects inside
            setFiles((currentFiles) => {
                if (!multiple) {
                    currentFiles.forEach(revokeFilePreview);
                    return [accepted[0]];
                }
                return [...currentFiles, ...accepted];
            });

            // Trigger auto-upload after setFiles, passing the file objects directly.
            // This avoids the filesRef race condition (the ref is synced in a useEffect
            // that runs after render, but we already have the objects here).
            if (autoUpload && uploadFile) {
                const filesToUpload = multiple ? accepted : [accepted[0]];
                filesToUpload.forEach((uf) => uploadSingleFile(uf.id, uf));
            }
        },
        [autoUpload, multiple, updateError, uploadFile, uploadSingleFile]
    );


    /** -----------------------------------------------------------------------------------------------------------
     * Handles files rejected by react-dropzone (e.g., unsupported type, size exceeded, too many files).
     * Extracts readable error messages and surfaces them to the UI and optional callback.
     ** ----------------------------------------------------------------------------------------------------------- */
    const handleDropRejected = useCallback(
        (fileRejections: FileRejection[]) => {
            onDropRejected?.(fileRejections);

            const rejectionErrors = fileRejections.map((rejection) => {
                const messages = rejection.errors.map((e) => e.message).join(", ");
                return `${rejection.file.name}: ${messages}`;
            });

            updateError({
                error: `${fileRejections.length} file${fileRejections.length === 1 ? "" : "s"} rejected`,
                files: rejectionErrors,
            });
        },
        [onDropRejected, updateError]
    );

    /** -----------------------------------------------------------------------------------------------------------
     * Removes an individual file by its ID, aborts any active upload, and immediately revokes its object URL.
     ** ----------------------------------------------------------------------------------------------------------- */
    const removeFile = useCallback((id: string) => {
        if (abortControllersRef.current.has(id)) {
            abortControllersRef.current.get(id)?.abort();
            abortControllersRef.current.delete(id);
        }

        setFiles((currentFiles) => {
            const fileToRemove = currentFiles.find((f) => f.id === id);
            revokeFilePreview(fileToRemove);
            return currentFiles.filter((f) => f.id !== id);
        });
    }, []);

    /** -----------------------------------------------------------------------------------------------------------
     * Clears all selected files, aborts all active uploads, revokes all active object URLs, and resets errors.
     ** ----------------------------------------------------------------------------------------------------------- */
    const clearFiles = useCallback(() => {
        cancelAllUploads();
        setFiles((currentFiles) => {
            currentFiles.forEach(revokeFilePreview);
            return [];
        });
        updateError(undefined);
    }, [cancelAllUploads, updateError]);

    /** -----------------------------------------------------------------------------------------------------------
     * Dismisses the active error state.
     ** ----------------------------------------------------------------------------------------------------------- */
    const clearError = useCallback(() => updateError(undefined), [updateError]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop: handleDrop,
        onDropRejected: handleDropRejected,
        accept,
        maxSize,
        maxFiles,
        multiple,
    });

    // Compute aggregate progress
    const totalFiles = files.length;
    const completedFiles = files.filter((f) => f.status === "success").length;
    const failedFiles = files.filter((f) => f.status === "error").length;
    const uploadingFiles = files.filter((f) => f.status === "uploading").length;
    const isUploading = uploadingFiles > 0;

    const totalProgressSum = files.reduce((sum, f) => sum + (f.progress ?? 0), 0);
    const aggregatePercentage = totalFiles > 0 ? Math.round(totalProgressSum / totalFiles) : 0;

    const aggregateProgress =
        totalFiles > 0 && (isUploading || completedFiles > 0 || failedFiles > 0)
            ? {
                  totalFiles,
                  completedFiles,
                  failedFiles,
                  uploadingFiles,
                  percentage: aggregatePercentage,
              }
            : undefined;

    return {
        files,
        isDragActive,
        isDragReject,
        getRootProps,
        getInputProps,
        removeFile,
        clearFiles,
        error,
        clearError,
        updateFile,
        uploadSingleFile,
        uploadAllFiles,
        cancelUpload,
        cancelAllUploads,
        aggregateProgress,
        isUploading,
    };
};

export default useFileUploader;