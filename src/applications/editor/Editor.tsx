import PageTemplate from "../../templates/PageTemplate";
import EditorTemplate from "./templates/Editor.Template";
import useEditor from "./useEditor";

const Editor = () => {
  const editor = useEditor();

  return (
    <PageTemplate>
      <EditorTemplate editor={editor} />
    </PageTemplate>
  );
};

export default Editor;