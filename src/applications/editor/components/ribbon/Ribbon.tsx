import type { Editor } from "@tiptap/core";

import {
  EDITOR_TABS,
  GROUP_ORDER,
} from "../../../../constants";

import type { FileDialogType } from "../fileDialog/fileDialog.types";
import type { SVGIconName } from "../../../../sharedComponents/buttons/SVG/SVGIcon";

import {
  StyledEditorRibbon,
  StyledEditorRibbonGroup,
  StyledEditorRibbonGroupItems,
  StyledEditorRibbonGroupLabel,
  StyledEditorRibbonTabs,
} from "./Ribbon.styles";

import EditorRibbonTab from "./components/EditorRibbonTab";
import RibbonItem from "./components/RibbonItem";
import TabItemsWrapper from "./components/TabItemsWrapper";
import useRibbon from "./useRibbon";
import type { RibbonMenuItem } from "./RibbonTypes";

interface RibbonProps {
  editor: Editor | null;
  openFileDialog: (type: FileDialogType) => void;
}

const Ribbon = ({
  editor,
  openFileDialog,
}: RibbonProps) => {
  const {
    activeTab,
    handleRibbonTabChange,
    handleRibbonItemClick,
    isItemActive,
  } = useRibbon(editor, openFileDialog);

  const tabs = Object.values(EDITOR_TABS);

  const visibleTab =
    tabs.find((tab) => tab.value === activeTab) ?? tabs[0];

  const visibleTabItems =
    visibleTab.items as RibbonMenuItem[];

  const groups = GROUP_ORDER
    .map((group) => ({
      ...group,
      items: visibleTabItems.filter(
        (item) => (item.group ?? "other") === group.key,
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <StyledEditorRibbon>
      <StyledEditorRibbonTabs
        role="tablist"
        aria-label="Editor ribbon tabs"
      >
        {tabs.map((tab, index) => (
          <EditorRibbonTab
            key={tab.value}
            label={tab.label}
            onClick={() =>
              handleRibbonTabChange(tab.value)
            }
            isActive={activeTab === tab.value}
            index={index}
          />
        ))}
      </StyledEditorRibbonTabs>

      <TabItemsWrapper
        aria-label={`${visibleTab.label} menu`}
      >
        {groups.map((group) => (
          <StyledEditorRibbonGroup key={group.key}>
            <StyledEditorRibbonGroupLabel>
              {group.label}
            </StyledEditorRibbonGroupLabel>

            <StyledEditorRibbonGroupItems>
              {group.items.map((item) => (
                <RibbonItem
                  key={`${visibleTab.value}-${group.key}-${item.value}`}
                  icon={item.icon as SVGIconName | undefined}
                  label={item.label}
                  onClick={() =>
                    handleRibbonItemClick(item)
                  }
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