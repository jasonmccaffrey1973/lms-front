import Button from "../Button/Button";
import Render from "../Render";
import SVGIcon from "../SVG/SVGIcon";
import { 
    StyledContainer, 
    StyledDescription,
    StyledDropZone,
    StyledDropZoneContent,
    StyledFileItem,
    StyledTitle,
    StyledFileList,
    StyledListHeader,
    StyledErrorWrapper,
    StyledProgressBar,
    StyledAggregateProgress,
} from "./fileUploader.styles";

import type { FileUploaderProps, UploaderFile } from "./fileUploader.types";
import useFileUploader from "./useFileUploader";

/**
 * Resolves an appropriate icon based on the file MIME type or file extension.
 */
const getFileIcon = (file: File) => {
    const type = file.type?.toLowerCase() || "";
    const name = file.name?.toLowerCase() || "";

    if (type.startsWith("image/")) return "image";
    if (type.startsWith("video/")) return "video";
    if (type.includes("pdf") || name.endsWith(".pdf")) return "pdf";
    if (type.includes("audio/") || name.endsWith(".mp3") || name.endsWith(".wav")) return "audioBulk";
    return "document";
};

/** ---------------------------------------------------------------------------------------
 * FileUploader Component
 *
 * ---------------------------------------------------------------------------------------
 * Example Usage:
 * ---------------------------------------------------------------------------------------
 * import { useState } from "react";
 * import FileUploader from "./FileUploader";
 * import type { UploaderFile } from "./fileUploader.types";
 *
 * const MyComponent = () => {
 *   const [files, setFiles] = useState<UploaderFile[]>([]);
 *
 *   return (
 *     <FileUploader
 *       accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
 *       maxSize={10 * 1024 * 1024} // 10 MB
 *       maxFiles={5}
 *       multiple={true}
 *       onFilesChange={setFiles}
 *       title="Upload Media"
 *       description="Drag & drop images here or click to browse (max 10MB each)"
 *     />
 *   );
 * };
 ** --------------------------------------------------------------------------------------- */
const FileUploader = ({
    title,
    description,
    showAggregateProgress = true,
    ...uploaderOptions
}: FileUploaderProps) => {
    const {
        files,
        isDragActive,
        isDragReject,
        getRootProps,
        getInputProps,
        removeFile,
        clearFiles,
        error,
        clearError,
        uploadSingleFile,
        cancelUpload,
        aggregateProgress,
    } = useFileUploader(uploaderOptions);

    const defaultTitle = isDragReject
        ? "Some files are not supported"
        : isDragActive
        ? "Drop files here"
        : "Drag & drop files here";

    const defaultDescription = isDragReject
        ? "Some selected files are not supported. Please select supported files."
        : "Drop files here or click to select files.";

    return (
        <StyledContainer>
{/** -------------------------------------------------------------------
 * ERRORS    
 ** ------------------------------------------------------------------- */}
        <Render if={error !== undefined}>
            <StyledErrorWrapper>
                <div role="status" aria-live="polite" aria-atomic="true">
                    <div className="error">{error?.error}</div>
                    <ul>
                        {error?.files.map((file) => (
                            <li key={file}>{file}</li>
                        ))}
                    </ul>
                </div>
                <Button type="button" color="danger" onClick={clearError}>Dismiss</Button>
            </StyledErrorWrapper>
        </Render>
{/** -------------------------------------------------------------------
 * Drop Zone (File Uploader)    
 ** ------------------------------------------------------------------- */}
        <StyledDropZone
            {...getRootProps({
                "aria-label": "File upload drop zone. Press Enter or Space to open file picker.",
                "aria-describedby": "uploader-description",
                role: "button",
            })}
            $isDragActive={isDragActive}
            $isDragReject={isDragReject}
        >
            <input {...getInputProps({ id: "uploader-file-input", "aria-label": "Select files to upload" })} />
            <StyledDropZoneContent>
                <SVGIcon icon="imageUpload" className="icon-drop" />
                <StyledTitle>
                    {title ?? defaultTitle}
                </StyledTitle>
                <StyledDescription id="uploader-description">
                    {description ?? defaultDescription}
                </StyledDescription>
                <Button
                    type="button"
                    color="primary"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="browse-button"
                >
                    Browse files
                </Button>
            </StyledDropZoneContent>
        </StyledDropZone>
{/** -------------------------------------------------------------------
 * Uploaded File List
 ** ------------------------------------------------------------------- */}
            <Render if={files.length > 0}>
                {showAggregateProgress && aggregateProgress && (
                    <StyledAggregateProgress>
                        <div className="aggregate-header">
                            <span>
                                {aggregateProgress.uploadingFiles > 0
                                    ? `Uploading ${aggregateProgress.completedFiles + 1} of ${aggregateProgress.totalFiles}...`
                                    : aggregateProgress.failedFiles > 0
                                    ? `${aggregateProgress.completedFiles} of ${aggregateProgress.totalFiles} uploaded (${aggregateProgress.failedFiles} failed)`
                                    : `All ${aggregateProgress.totalFiles} files uploaded successfully`}
                            </span>
                            <span className="count">{aggregateProgress.percentage}%</span>
                        </div>
                        <StyledProgressBar
                            $progress={aggregateProgress.percentage}
                            $status={
                                aggregateProgress.failedFiles > 0 && aggregateProgress.uploadingFiles === 0
                                    ? "error"
                                    : aggregateProgress.completedFiles === aggregateProgress.totalFiles
                                    ? "success"
                                    : "uploading"
                            }
                        >
                            <div className="bar" />
                        </StyledProgressBar>
                    </StyledAggregateProgress>
                )}
                <StyledListHeader>
                    <div className="preview">Preview</div>
                    <div className="name">Name</div>
                    <div className="size">Size</div>
                    <div className="actions">
                        <Button type="button" color="danger" aria-label="Clear all files" onClick={clearFiles}>
                            <SVGIcon icon="trash" />
                        </Button>
                    </div>
                </StyledListHeader>
                <StyledFileList aria-label="Selected files">
                    {files.map((file: UploaderFile) => (
                        <StyledFileItem key={file.id}>
                            <div className="preview">
                                {file.preview ? (
                                    <img src={file.preview} alt={file.file.name} />
                                ) : (
                                    <SVGIcon icon={getFileIcon(file.file)} />
                                )}
                            </div>
                            <div className="name" title={file.errorMessage ?? file.file.name}>
                                <span>{file.file.name}</span>
                                {file.errorMessage && (
                                    <div style={{ fontSize: "0.7rem", color: "var(--clr-danger, #ef4444)", marginTop: "2px" }}>
                                        {file.errorMessage}
                                    </div>
                                )}
                                {file.progress !== undefined && file.status !== "error" && (
                                    <StyledProgressBar $progress={file.progress} $status={file.status}>
                                        <div className="bar" />
                                    </StyledProgressBar>
                                )}
                            </div>
                            <div className="size">{file.sizeLabel}</div>
                            <div className="actions">
                                {file.status === "uploading" && (
                                    <Button
                                        type="button"
                                        aria-label={`Cancel uploading ${file.file.name}`}
                                        color="warning"
                                        onClick={() => cancelUpload(file.id)}
                                    >
                                        <SVGIcon icon="close" />
                                    </Button>
                                )}
                                {file.status === "error" && uploaderOptions.uploadFile && (
                                    <Button
                                        type="button"
                                        aria-label={`Retry upload for ${file.file.name}`}
                                        color="info"
                                        onClick={() => uploadSingleFile(file.id)}
                                    >
                                        <SVGIcon icon="redo" />
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    aria-label={`Remove ${file.file.name}`}
                                    color="danger"
                                    onClick={() => removeFile(file.id)}
                                >
                                    <SVGIcon icon="trash" />
                                </Button>
                            </div>
                        </StyledFileItem>
                    ))}
                </StyledFileList>
            </Render>
        </StyledContainer>
    );
};

export default FileUploader;