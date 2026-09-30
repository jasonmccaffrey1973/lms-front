import { useCallback } from "react";
import { useEditorState } from "../../../../EditorState";

const useRibbonRightArea = () => {
    const { zoomLevel, setZoomLevel } = useEditorState();

    const zoomLabel = `${Math.round(zoomLevel * 100)}%`;

    const handleZoomChange = useCallback((newZoomLevel: number) => {
        setZoomLevel(newZoomLevel);
    }, [setZoomLevel]);

    return {
        zoomLevel,
        handleZoomChange,
        zoomLabel
    };
}

export default useRibbonRightArea;
