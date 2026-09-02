import {
  StyledMenuList,
  StyledMenuListItem,
  ItemLabel,
  StyledMenuListWrapper,
} from "./RibbonListElement.styles";
import useRibbonListElement from "./useRibbonListElement";
import type { RibbonListElementProps } from "./RibbonListElement.types";

const RibbonListElement = ({ label, items }: RibbonListElementProps) => {
  const { handleListItemClick } = useRibbonListElement();

  return (
    <StyledMenuListWrapper>
        <StyledMenuList>
        {items.map((item) => (
            <StyledMenuListItem
            key={item.value}
            onClick={() => handleListItemClick(item.action, item.value)}
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