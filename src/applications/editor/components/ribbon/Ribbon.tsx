import type { Editor } from "@tiptap/core";
import { EDITOR_TABS, GROUP_ORDER } from "../../../../constants";
import { StyledEditorRibbon, StyledEditorRibbonTabs, StyledEditorRibbonGroup, StyledEditorRibbonGroupItems, StyledEditorRibbonGroupLabel } from "./Ribbon.styles";
import EditorRibbonTab from "./components/EditorRibbonTab";
import RibbonItem from "./components/RibbonItem";
import TabItemsWrapper from "./components/TabItemsWrapper";
import useRibbon from "./useRibbon";

interface RibbonProps {
  editor: Editor | null;
}

interface VisibleItemProps {
  icon?: string;
  label: string;
  value: string;
  action?: string;
  group?: string;
}

const Ribbon = ({ editor }: RibbonProps) => {
  const { activeTab, handleRibbonTabChange, handleRibbonItemClick, isItemActive } = useRibbon(editor);
  const tabs = Object.values(EDITOR_TABS);
  const visibleTab = tabs.find((tab) => tab.value === activeTab) ?? tabs[0];
  const visibleTabItems = visibleTab.items as Array<VisibleItemProps>;

  const groups = GROUP_ORDER.map((group) => ({
    ...group,
    items: visibleTabItems.filter((item) => (item.group ?? "other") === group.key),
  })).filter((group) => group.items.length > 0);

  return (
    <StyledEditorRibbon>
      <StyledEditorRibbonTabs role="tablist" aria-label="Editor ribbon tabs">
        {tabs.map((tab) => (
          <EditorRibbonTab
            key={tab.value}
            label={tab.label}
            onClick={() => handleRibbonTabChange(tab.value)}
            isActive={activeTab === tab.value}
            index={tabs.indexOf(tab)}
          />
        ))}
      </StyledEditorRibbonTabs>
        <TabItemsWrapper aria-label={`${visibleTab.label} menu`}>
          {groups.map((group) => (
            <StyledEditorRibbonGroup key={group.key}>
              <StyledEditorRibbonGroupLabel>{group.label}</StyledEditorRibbonGroupLabel>
              <StyledEditorRibbonGroupItems>
                {group.items.map((item, index) => (
                  <RibbonItem
                    key={`${visibleTab.value}-${group.key}-${item.value}-${index}`}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => handleRibbonItemClick(item)}
                    isActive={isItemActive(item)}
                  />
                ))}
              </StyledEditorRibbonGroupItems>
            </StyledEditorRibbonGroup>
          ))}
        </TabItemsWrapper>
    </StyledEditorRibbon>
  );
};

export default Ribbon;