import {
  StyledMenuList,
  StyledMenuListItem,
  ItemLabel,
  StyledMenuListWrapper,
} from "./RibbonListElement.styles";
import type { RibbonListElementProps } from "./RibbonListElement.types";

const RibbonListElement = ({ label, items, action }: RibbonListElementProps) => {

  return (
    <StyledMenuListWrapper>
        <StyledMenuList>
        {items.map((item) => (
            <StyledMenuListItem
            key={item.value}
            onClick={() => action?.(item.value)}
            >
            <ItemLabel $value={item.value}>{item.label}</ItemLabel>
            </StyledMenuListItem>
        ))}
        </StyledMenuList>
        <div className="label">{label}</div>
    </StyledMenuListWrapper>
  );
};

export default RibbonListElement;