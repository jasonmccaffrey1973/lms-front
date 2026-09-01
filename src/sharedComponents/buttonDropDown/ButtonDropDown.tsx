import StyledButtonDropDown from "./ButtonDropDown.styles";
import useButtonDropDown from "./useButtonDropDown";


const ButtonDropDown = () => {

    const { isOpen, toggleDropDown } = useButtonDropDown();

    return (
        <>
            <StyledButtonDropDown onClick={toggleDropDown}>

                
            </StyledButtonDropDown>
            <section aria-expanded={isOpen} aria-haspopup="listbox" role="listbox">
                
            </section>
        </>
    )
}

export default ButtonDropDown;