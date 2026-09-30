import Button from "../../../../sharedComponents/Button/Button";
import SVGIcon from "../../../../sharedComponents/SVG/SVGIcon";
import { useZoomSelector } from "./useZoomSelector";
import { StyledZoomForm, StyledZoomSelector } from "./zoomSelector.styles";

const ZoomSelectorItem = ({ label, value, onClick }: { label: string; value: number;  onClick: (value: number) => void }) => (
    <li key={value}>
        <Button color="transparent" className="standard-level-button" onClick={() => onClick(value)}>{label}</Button>
    </li>
);

const ZoomSelector = ({ value = 1, onChange, onCancel }: { value?: number; onChange?: (value: number) => void; onCancel?: () => void }) => {
const {
    STANDARD_ZOOM_LEVELS,
    min,
    max,
    zoomLevel,
    setZoom,
    incrementZoom,
    decrementZoom,
    resetZoom,
    handleSubmit,
    handleStaticValueClick
} = useZoomSelector({ value, onChange, onCancel }); 

    return (
        <StyledZoomForm onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
            <div className="zoom-header">
                Zoom Level (<strong>{zoomLevel.label}</strong>)
            </div>
            <div className="zoom-body">
                <StyledZoomSelector>
                    <div className="reset-wrapper">
                        <Button
                            color="transparent"
                            className="zoom-reset"
                            onClick={resetZoom}
                        >
                            <SVGIcon icon="zoom" />
                            100%
                        </Button>
                    </div>

                    <div className="custom-level-wrapper">

                        <Button 
                            color="transparent"
                            className="zoom-out"
                            onClick={decrementZoom}
                        >
                            <SVGIcon icon="zoomOut" />
                        </Button>

                        <input
                            type="range"
                            aria-label="Zoom Level"
                            min={min}
                            max={max}
                            value={zoomLevel.value}
                            step={0.01}
                            onChange={(event) => setZoom(Number(event.currentTarget.value))}
                        />

                        <Button
                            color="transparent"
                            className="zoom-in"
                            onClick={incrementZoom}
                        >
                            <SVGIcon icon="zoomIn" />
                        </Button>
                        
                    </div>

                    <ul className="standard-levels">
                        {Object.values(STANDARD_ZOOM_LEVELS).map(({ label, value }) => (
                            <ZoomSelectorItem
                                key={value}
                                label={label}
                                value={value}
                                onClick={() => handleStaticValueClick(value)}
                            />
                        ))}
                    </ul>
                </StyledZoomSelector>
            </div>
            <div className="zoom-footer">
                <Button color="success" type="submit"> Done </Button>
            </div>
        </StyledZoomForm>
    );
};

export default ZoomSelector;
