import type { Editor as TiptapEditor } from "@tiptap/core";
import { EditorContent } from "@tiptap/react";

import FileDialog from "../components/fileDialog/FileDialog";
import useFileDialog from "../components/fileDialog/useFileDialog";
import Ribbon from "../components/ribbon/Ribbon";
import StyledEditorTemplate from "./Editor.Template.Styles";

interface EditorTemplateProps {
  editor: TiptapEditor | null;
}

const EditorTemplate = ({ editor }: EditorTemplateProps) => {
  const {
    fileDialogOpen,
    fileDialogType,
    openFileDialog,
    closeFileDialog,
  } = useFileDialog();

  return (
    <>
      <StyledEditorTemplate>
        <Ribbon
          editor={editor}
          openFileDialog={openFileDialog}
        />

        <div
          className="editor-shell"
          aria-label="Lesson editor body"
        >
          {editor ? <EditorContent editor={editor} /> : null}
        </div>
      </StyledEditorTemplate>

      <FileDialog
        type={fileDialogType}
        open={fileDialogOpen}
        onClose={closeFileDialog}
      />
    </>
  );
};

export default EditorTemplate;