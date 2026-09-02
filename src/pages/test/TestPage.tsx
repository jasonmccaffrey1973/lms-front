import ButtonDropDown from "../../sharedComponents/buttonDropDown/ButtonDropDown";
import ColorPicker from "../../sharedComponents/colorPicker/ColorPicker";
const TestPage = () => {
  

  return (

    <ButtonDropDown label="Text Color" icon="textcolor" value="#ff0000" isActive={true} onPrimaryAction={(val) => console.log(val)}>
      <ColorPicker value="#ff0000" onChange={(val) => console.log(val)} />
    </ButtonDropDown>

  );
};

export default TestPage;