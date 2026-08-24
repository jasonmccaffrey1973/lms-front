import { StyledEditorRibbonTab, StyledEditorRibbonTabLabel } from "../Ribbon.styles";

interface EditorRibbonTabProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  index: number;
  children?: React.ReactNode;
}

const EditorRibbonTab = ({ label, onClick, isActive, index, children }: EditorRibbonTabProps) => {
  return (
    <StyledEditorRibbonTab onClick={onClick} role="button" tabIndex={index} aria-label={label} aria-selected={isActive}>
      <StyledEditorRibbonTabLabel>{label}</StyledEditorRibbonTabLabel>
      {children}
    </StyledEditorRibbonTab>
  );
};

export default EditorRibbonTab;