import { EditorContent } from "@tiptap/react";

import RibbonItem from "../../applications/editor/components/ribbon/components/RibbonItem";
import { StyledMiniEditor } from "./miniEditor.styles";
import type { MiniEditorProps } from "./miniEditor.types";
import useMiniEditor from "./useMiniEditor";

const MiniEditor = ({ value, onChange, height = "240px" }: MiniEditorProps) => {
  const { editor, homeGroups, handleItemClick } = useMiniEditor({ value, onChange });

  return (
    <StyledMiniEditor $height={height}>
      <div className="mini-editor__toolbar" role="toolbar" aria-label="Text formatting">
        {homeGroups.map((group) => (
          <div className="mini-editor__group" key={group.key}>
            <span className="mini-editor__group-label">{group.label}</span>
            <div className="mini-editor__group-items">
              {group.items.map(({ item, value: itemValue, isActive }) => (
                <RibbonItem
                  key={`${group.key}-${item.value ?? item.label}`}
                  elementType={item.elementType}
                  value={itemValue}
                  icon={item.icon}
                  label={item.label}
                  options={item.options}
                  items={item.items}
                  isActive={isActive}
                  action={(selectedValue) => handleItemClick(item, selectedValue)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mini-editor__surface">
        <EditorContent editor={editor} />
      </div>
    </StyledMiniEditor>
  );
};

export default MiniEditor;
