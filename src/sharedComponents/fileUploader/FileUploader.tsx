import Button from "../Button/Button";
import Render from "../Render";
import SVGIcon from "../SVG/SVGIcon";
import { 
    StyledContainer, 
    StyledDescription,
    StyledDropZone,
    StyledDropZoneContent,
    StyledFileInfo,
    StyledFileItem,
    StyledStatus,
    StyledTitle,
    StyledFileList
} from "./fileUploader.styles";

import useFileUploader from "./useFileUploader";

const FileUploader = () => {
    const {
        files,
        isDragActive,
        isDragReject,
        getRootProps, getInputProps, removeFile, } = useFileUploader();
    return (
        <StyledContainer>
        <StyledDropZone {...getRootProps({ "aria-label": "Upload files", "aria-describedby": "uploader-description", })}

                $isDragActive={isDragActive} $isDragReject={isDragReject} >
                <input {...getInputProps({ id: "uploader-file-input", "aria-label": "Select files to upload", })} />
                <StyledDropZoneContent>
                    <StyledTitle>
                        {isDragReject ? "Some files are not supported" : isDragActive ? "Drop files here" : "Drag & drop files here"}
                    </StyledTitle>
                    <StyledDescription id="uploader-description">
                        {isDragReject ? "Some selected files are not supported. Please select supported files." : "Drop files here or click to select files."}
                    </StyledDescription>
                </StyledDropZoneContent>
            </StyledDropZone>
            <StyledStatus role="status" aria-live="polite" aria-atomic="true" >
                {files.length === 0 ? "No files selected." : `${files.length} ${files.length === 1 ? "file" : "files"} selected.`}
            </StyledStatus>
            <Render if={files.length > 0}>
                <StyledFileList aria-label="Selected files"> {files.map((file) => (
                    <StyledFileItem key={file.id}>
                        <StyledFileInfo>
                            <div className="preview"></div>
                            <div className="name">{file.file.name}</div>
                            <div className="size">({file.sizeLabel})</div>
                        </StyledFileInfo>
                        <Button
                            type="button"
                            aria-label={`Remove ${file.file.name}`}
                            color="danger"
                            onClick={() => removeFile(file.id)}
                        >
                            <SVGIcon icon="trash" /> Remove
                        </Button>
                    </StyledFileItem>))}
                </StyledFileList>
            </Render>
        </StyledContainer>
    );
};

export default FileUploader;