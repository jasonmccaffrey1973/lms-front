import { StyledEditorRibbonTabItemsWrapper } from "../Ribbon.styles";

interface TabItemsWrapperProps {
  children: React.ReactNode;
  "aria-label"?: string;
}

const TabItemsWrapper = ({ children, "aria-label": ariaLabel }: TabItemsWrapperProps) => {
  return (
    <StyledEditorRibbonTabItemsWrapper role="menu" aria-label={ariaLabel ?? "Ribbon tab items"}>
      {children}
    </StyledEditorRibbonTabItemsWrapper>
  );
};

export default TabItemsWrapper;