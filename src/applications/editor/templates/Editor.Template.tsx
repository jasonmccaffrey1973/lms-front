import { EditorContent } from "@tiptap/react";
import type { Editor as TiptapEditor } from "@tiptap/core";
import Ribbon from "../components/ribbon/Ribbon";
import StyledEditorTemplate from "./Editor.Template.Styles";

interface EditorTemplateProps {
  editor: TiptapEditor | null;
}

const EditorTemplate = ({ editor }: EditorTemplateProps) => {
  return (
    <StyledEditorTemplate>
      <Ribbon />
      <div className="editor-shell" aria-label="Lesson editor body">
        {editor ? <EditorContent editor={editor} /> : null}
      </div>
    </StyledEditorTemplate>
  );
};

export default EditorTemplate;
