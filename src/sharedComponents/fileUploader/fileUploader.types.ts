import type { DropzoneState } from "react-dropzone"; 

interface UploaderFile {
    id: string;
    file: File;
    sizeLabel: string;
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
}

export type { UploaderFile, UseUploaderReturn };