import { useEffect, useId } from "react";
import { EditorContent } from "@tiptap/react";

import RibbonItem from "../../applications/editor/components/ribbon/components/RibbonItem";
import { StyledMiniEditor } from "./miniEditor.styles";
import type { MiniEditorProps } from "./miniEditor.types";
import useMiniEditor from "./useMiniEditor";

const MiniEditor = ({
  label,
  labelPlacement = "top",
  value,
  onChange,
  height = "240px",
}: MiniEditorProps) => {
  const { editor, homeGroups, handleItemClick } = useMiniEditor({ value, onChange });
  const labelId = useId();

  useEffect(() => {
    const editableElement = editor?.view.dom;
    if (!editableElement || !label) return;

    editableElement.setAttribute("aria-labelledby", labelId);
    return () => editableElement.removeAttribute("aria-labelledby");
  }, [editor, label, labelId]);

  return (
    <StyledMiniEditor $height={height} $labelPlacement={labelPlacement}>
      {label ? (
        <label
          className="mini-editor__label"
          id={labelId}
          onClick={() => editor?.commands.focus()}
        >
          {label}
        </label>
      ) : null}
      <div className="mini-editor__body">
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
      </div>
    </StyledMiniEditor>
  );
};

export default MiniEditor;
