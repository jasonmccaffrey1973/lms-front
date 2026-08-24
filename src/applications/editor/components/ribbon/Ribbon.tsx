import { EDITOR_TABS } from "../../../../constants";
import { StyledEditorRibbon } from "./Ribbon.styles";
import EditorRibbonTab from "./components/EditorRibbonTab";
import RibbonItem from "./components/RibbonItem";
import TabItemsWrapper from "./components/TabItemsWrapper";
import useRibbon from "./useRibbon";

const Ribbon = () => {
  const { activeTab, handleRibbonTabChange, handleRibbonItemClick } = useRibbon();
  const tabs = Object.values(EDITOR_TABS);
  const visibleTab = tabs.find((tab) => tab.value === activeTab) ?? tabs[0];

  return (
    <StyledEditorRibbon>
      {tabs.map((tab) => (
        <EditorRibbonTab
          key={tab.value}
          label={tab.label}
          onClick={() => handleRibbonTabChange(tab.value)}
          isActive={activeTab === tab.value}
          index={tabs.indexOf(tab)}
        />
      ))}

      {visibleTab ? (
        <TabItemsWrapper aria-label={`${visibleTab.label} menu`}>
          {visibleTab.items.map((item, index) => (
            <RibbonItem
              key={`${visibleTab.value}-${index}`}
              label={item.label}
              onClick={() => handleRibbonItemClick(item.label)}
            />
          ))}
        </TabItemsWrapper>
      ) : null}
    </StyledEditorRibbon>
  );
};

export default Ribbon;