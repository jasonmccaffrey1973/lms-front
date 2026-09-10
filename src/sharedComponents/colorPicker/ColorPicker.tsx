import { type ColorPickerProps } from "./ColorPicker.types";
import { StyledColorPicker } from "./ColorPicker.styles";
import useColorPicker from "./useColorPicker";
import Button from "../Button/Button";
import SVGIcon from "../SVG/SVGIcon";
import { useTheme } from "../../theme";

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
    const { theme } = useTheme();
    const isSystemDark =
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : false;

    const isDarkMode = theme === "dark" || (theme === "system" && isSystemDark);

    const { COLOR_PALETTE, STANDARD_COLORS, colorInputValue, handleColorClick } = useColorPicker({
        initialColor: value,
        changeHandler: onChange,
        isDarkMode,
    });

    const ColorButton = ({ color }: { color: string }) => {
        const handleClick = () => handleColorClick(color);
            
        return <button style={{ backgroundColor: color }} onClick={handleClick} />;
    };


    return <StyledColorPicker>
        <div className="clear-wrapper">
            {/* <div className="current-color" style={{ backgroundColor: currentColor }}></div> */}
            <Button color="danger" type="button" onClick={() => handleColorClick("")}>
                <SVGIcon icon="clearformatting" />
                Clear
            </Button>
        </div>
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
            <input id="color-input" type="color" value={colorInputValue} onChange={(e) => handleColorClick(e.target.value)} />
        </div>
    </StyledColorPicker>
}

export default ColorPicker;