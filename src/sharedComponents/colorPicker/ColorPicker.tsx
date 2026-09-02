import { type ColorPickerProps } from "./ColorPicker.types";
import { StyledColorPicker } from "./ColorPicker.styles";
import useColorPicker from "./useColorPicker";

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {

    const { COLOR_PALETTE, STANDARD_COLORS, currentColor, handleColorClick } = useColorPicker({initialColor: value, changeHandler: onChange});

    const ColorButton = ({ color }: { color: string }) => {
        const handleClick = () => handleColorClick(color);
            
        return <button style={{ backgroundColor: color }} onClick={handleClick} />;
    };


    return <StyledColorPicker>
        <div className="color-palette">
            {Object.entries(COLOR_PALETTE).map(([shade, colors]) => (
                <div key={shade} className="shade-row">
                    {colors.map((color) => (
                        <ColorButton key={color} color={color} />
                    ))}
                </div>
            ))}
        </div>
        <div className="standard-colors">
            {STANDARD_COLORS.map((color) => (
                <ColorButton key={color} color={color} />
            ))}
        </div>
        <div className="custom-color">
            <input id="color-input" type="color" value={currentColor} onChange={(e) => handleColorClick(e.target.value)} />
        </div>
    </StyledColorPicker>
}

export default ColorPicker;