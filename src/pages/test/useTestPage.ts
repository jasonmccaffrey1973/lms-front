import { useEffect, useState } from "react";
import formatDateTime from "../../helperFunctions/formatDateTime";

const TEST_METADATA = {
    filename: "example.jpg",
    type: "image/jpeg",
    size: "1024 KB",
    lastModified: "2024-06-01T12:34:56.000Z",
    created: "2024-05-01T12:34:56.000Z",
    description: "This is an example image for testing purposes.",
    tags: ["example", "test", "image"],
    author: "John Doe",
    dimensions: {
        width: 600,
        height: 400
    }
}

const spaceCamelCase = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());

const sanitizeMeta = (meta: Record<string, unknown>) => {
    
    const FILTERED_META = [
        {key:"filename", type: "string"}, 
        {key:"type", type: "string"},
        {key:"size", type: "string"},
        {key:"lastModified", type: "date"},
        {key:"created", type: "date"},
        {key:"description", type: "string"},
        {key:"tags", type: "array"},
        {key:"author", type: "string"},
        {key:"dimensions", type: "object"},
    ];
    
    const sanitized: Record<string, unknown> = {};
    FILTERED_META.forEach(({key, type}) => {
        if (key in meta) {
            switch (type) {
                case "string": sanitized[key] = spaceCamelCase(meta[key] as string);
                    break;
                case "date": sanitized[key] = formatDateTime(meta[key] as string);
                    break;
                case "array": sanitized[key] = meta[key];
                    break;
                case "object": sanitized[key] = meta[key];
                    break;
            }
        }
    });
    return sanitized;
};


/** ---------------------------------------------------------------------
 * TODO: Implement actual media fetching logic.
 * @returns An object containing media information and metadata.
 ** --------------------------------------------------------------------- */
const getMedia = () => {
    return {
        filename: TEST_METADATA.filename,
        type: TEST_METADATA.type,
        src: `https://placehold.co/600x400`,
        meta: sanitizeMeta(TEST_METADATA)
    }
}

const useTestPage = () => {

    const [MetaVisible, setMetaVisible] = useState(false);
    const [media, setMedia] = useState<Record<string, unknown> | undefined>(undefined); 
    const [meta, setMeta] = useState<Record<string, unknown> | undefined>(undefined); 

    useEffect(() => {
        setTimeout(() => { // Simulate async data fetching
            const data = getMedia();
            setMedia(data);
            setMeta(data.meta);
        }, 1000);
    } , []);

    const showMeta = ()=> setMetaVisible(true);

    const hideMeta = ()=> setMetaVisible(false);

    const toggleMeta = () => MetaVisible ? hideMeta() : showMeta();

    return {
        media,
        showMeta,
        hideMeta,
        MetaVisible,
        toggleMeta,
        meta,
        setMeta
    };

};

export default useTestPage;