import EditorTemplate from "./templates/Editor.Template";
import useEditor from "./useEditor";
import { EditorStateProvider } from "./EditorState";

const Editor = () => {
  const editor = useEditor();

  return (
    <EditorStateProvider editor={editor}>
      <EditorTemplate editor={editor} />
    </EditorStateProvider>
  );
};

export default Editor;