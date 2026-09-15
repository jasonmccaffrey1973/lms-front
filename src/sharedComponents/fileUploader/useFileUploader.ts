import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import type { UploaderFile, UseUploaderReturn, } from "./fileUploader.types"; 

const formatFileSize = (bytes: number): string => {
     if (bytes === 0) { 
        return "0 Bytes"; 
    }

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const index = Math.floor( Math.log(bytes) / Math.log(1024) );
        
    return `${parseFloat( (bytes / Math.pow(1024, index)).toFixed(2) )} ${units[index]}`; 
};

     
const useFileUploader = (): UseUploaderReturn => {
    const [files, setFiles] = useState<UploaderFile[]>([]);
    const handleDrop = useCallback((acceptedFiles: File[]) => {
         const uploaderFiles: UploaderFile[] = acceptedFiles.map( (file) => ({ id: crypto.randomUUID(), file, sizeLabel: formatFileSize(file.size), }) );
         setFiles((currentFiles) => [ ...currentFiles, ...uploaderFiles, ]);
    }, []);

    const removeFile = useCallback((id: string) => {
        setFiles((currentFiles) => currentFiles.filter((file) => file.id !== id) );
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject, } = useDropzone({ onDrop: handleDrop, multiple: true, });

    return { files, isDragActive, isDragReject, getRootProps, getInputProps, removeFile, };
};

export default useFileUploader;