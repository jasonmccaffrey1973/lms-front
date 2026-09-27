import { EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";

import type { EditorTemplateProps } from "./editor.template.types";
import useEditorTemplate from "./useEditor.template";

import FileDialog from "../components/fileDialog/FileDialog";
import useFileDialog from "../components/fileDialog/useFileDialog";
import Ribbon from "../components/ribbon/Ribbon";
import StyledEditorTemplate from "./Editor.Template.Styles";
import MediaDialog from "../../media/components/MediaDialog";
import SpellingGrammarDialog from "../components/spellingGrammarDialog/SpellingGrammarDialog";
import TrackChangesDialog from "../components/trackChangesDialog/TrackChangesDialog";
import useDialog from "../../../sharedComponents/dialog/useDialog";
import useAutosave from "../hooks/useAutosave";

const EditorTemplate = ({
  editor,
}: EditorTemplateProps) => {
  const {
    currentLessonId,
    selectedDocumentId,
    setSelectedDocumentId,

    mediaDialogOpen,
    mediaDialogMode,
    openMediaDialog,
    closeMediaDialog,

    documents,
    refetchLessons,

    handleMediaUpload,
    handleMediaUrlSubmit,

    saveLesson,
    saveLessonAs,
    openLesson,
  } = useEditorTemplate({
    editor,
  });

  /*
   * File dialog
   */
  const {
    dialogRef: fileDialogRef,
    dialogControls: fileDialogControls,
    fileDialogOpen,
    fileDialogType,
    openFileDialog,
    processDialogclose,
    filename,
    setFilename,
    searchFileName,
    setSearchFileName,
  } = useFileDialog({
    openDocument: openLesson,
    saveDocument: saveLesson,
    saveDocumentAs: saveLessonAs,
  });

  /*
   * Confirm file dialog action.
   */
  const handleConfirm = async () => {
    await processDialogclose();
  };

  /*
   * Refresh the lesson list whenever the
   * Open Document dialog is opened.
   */
  useEffect(() => {
    if (
      fileDialogOpen &&
      fileDialogType === "openDocument"
    ) {
      void refetchLessons();
    }
  }, [
    fileDialogOpen,
    fileDialogType,
    refetchLessons,
  ]);

  /*
   * Autosave
   */
  useAutosave({
    editor,
    currentLessonId,
    onSave: async () => {
      if (filename) {
        await saveLesson(filename);
      }
    },
    delayMs: 2500,
  });

  /*
   * Spelling / Grammar dialog
   */
  const spellingGrammarDialogRef =
    useRef<HTMLDialogElement>(null!);

  const spellingGrammarDialogControls =
    useDialog({
      ref: spellingGrammarDialogRef,
    });

  /*
   * Track Changes dialog
   */
  const trackChangesDialogRef =
    useRef<HTMLDialogElement>(null!);

  const trackChangesDialogControls =
    useDialog({
      ref: trackChangesDialogRef,
    });

  return (
    <>
      <StyledEditorTemplate>
        <Ribbon
          editor={editor}
          openFileDialog={openFileDialog}
          openMediaDialog={openMediaDialog}
          openSpellingGrammarDialog={
            spellingGrammarDialogControls.openDialog
          }
          openTrackChangesDialog={
            trackChangesDialogControls.openDialog
          }
        />

        <div
          className="editor-shell"
          aria-label="Lesson editor body"
        >
          {editor ? (
            <EditorContent editor={editor} />
          ) : null}
        </div>
      </StyledEditorTemplate>

      <SpellingGrammarDialog
        editor={editor}
        dialogRef={spellingGrammarDialogRef}
        controls={spellingGrammarDialogControls}
      />

      <TrackChangesDialog
        editor={editor}
        dialogRef={trackChangesDialogRef}
        controls={trackChangesDialogControls}
      />

      <FileDialog
        type={fileDialogType}
        dialogRef={fileDialogRef}
        controls={fileDialogControls}
        onConfirm={handleConfirm}
        filename={filename}
        setFilename={setFilename}
        searchFileName={searchFileName}
        setSearchFileName={setSearchFileName}
        documents={documents}
        selectedDocumentId={selectedDocumentId}
        setSelectedDocumentId={setSelectedDocumentId}
      />

      {mediaDialogOpen ? (
        <MediaDialog
          open={mediaDialogOpen}
          initialMode={mediaDialogMode}
          onClose={closeMediaDialog}
          onUpload={handleMediaUpload}
          onUrlSubmit={handleMediaUrlSubmit}
        />
      ) : null}
    </>
  );
};

export default EditorTemplate;