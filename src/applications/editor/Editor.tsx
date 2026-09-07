import PageTemplate from "../../templates/PageTemplate";
import EditorTemplate from "./templates/Editor.Template";
import useEditor from "./useEditor";
import { EditorStateProvider } from "./EditorState";

const Editor = () => {
  const editor = useEditor();

  return (
    <PageTemplate>
      <EditorStateProvider editor={editor}>
        <EditorTemplate editor={editor} />
      </EditorStateProvider>
    </PageTemplate>
  );
};

export default Editor;