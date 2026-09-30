import { useEffect, useRef, useState } from "react";



const STANDARD_ZOOM_LEVELS = {
    50: { label: "50%", value: 0.5 },
    75: { label: "75%", value: 0.75 },
    100: { label: "100%", value: 1 },
    200: { label: "200%", value: 2 },
    400: { label: "400%", value: 4 }
};

const DEFAULT_ZOOM_LEVEL = STANDARD_ZOOM_LEVELS[100];

const ZOOM_LEVELS = Object.values(STANDARD_ZOOM_LEVELS);

const MIN_ZOOM_LEVEL = ZOOM_LEVELS[0];
const MAX_ZOOM_LEVEL = ZOOM_LEVELS[ZOOM_LEVELS.length - 1];

const DEBOUNCE_DELAY = 300;

const getZoomLevel = (value: number) => {
    return ZOOM_LEVELS.find(level => level.value === value) ?? {
        label: `${Math.round(value * 100)}%`,
        value,
    };
};

const useZoomSelector = ({
    value = 1,
    onChange,
    onCancel
}: {
    value: number;
    onChange?: (value: number) => void;
    onCancel?: () => void;
}) => {
    const [zoomLevel, setZoomLevel] = useState(
        getZoomLevel(value) ?? DEFAULT_ZOOM_LEVEL
    );

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearDebounceTimer = () => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = null;
        }
    };

    useEffect(() => {
        clearDebounceTimer();

        debounceTimer.current = setTimeout(() => {
            onChange?.(zoomLevel.value);
            debounceTimer.current = null;
        }, DEBOUNCE_DELAY);

        return clearDebounceTimer;
    }, [zoomLevel, onChange]);

    const setZoom = (value: number) => {
        setZoomLevel(getZoomLevel(value));
    };

    const incrementZoom = () => {
        const nextLevel = ZOOM_LEVELS.find(
            level => level.value > zoomLevel.value
        ) ?? MAX_ZOOM_LEVEL;

        setZoomLevel(nextLevel);
    };

    const decrementZoom = () => {
        const previousLevel = [...ZOOM_LEVELS].reverse().find(
            level => level.value < zoomLevel.value
        ) ?? MIN_ZOOM_LEVEL;

        setZoomLevel(previousLevel);
    };

    const resetZoom = () => {
        setZoomLevel(DEFAULT_ZOOM_LEVEL);
    };

    const handleSubmit = () => {
        clearDebounceTimer();
        onChange?.(zoomLevel.value);
        onCancel?.();
    };

    const handleStaticValueClick = (value: number) => {
        clearDebounceTimer();
        setZoomLevel(getZoomLevel(value));
        onChange?.(value);
        onCancel?.();
    };

    return {
        STANDARD_ZOOM_LEVELS,
        min: MIN_ZOOM_LEVEL.value,
        max: MAX_ZOOM_LEVEL.value,
        zoomLevel,
        setZoom,
        handleStaticValueClick,
        incrementZoom,
        decrementZoom,
        resetZoom,
        handleSubmit
    };
};

export { useZoomSelector };