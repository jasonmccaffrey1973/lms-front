import { EditorContent } from "@tiptap/react";
import { useEffect, useRef, type CSSProperties } from "react";

import type { EditorTemplateProps } from "./editor.template.types";
import useEditorTemplate from "./useEditor.template";

import FileDialog from "../components/fileDialog/FileDialog";
import useFileDialog from "../components/fileDialog/useFileDialog";
import Ribbon from "../components/ribbon/Ribbon";
import StyledEditorTemplate from "./Editor.Template.Styles";
import MediaDialog from "../../media/components/MediaDialog";
import SpellingGrammarDialog from "../components/spellingGrammarDialog/SpellingGrammarDialog";
import TrackChangesDialog from "../components/trackChangesDialog/TrackChangesDialog";
import HelpDialog from "../components/helpDialog/HelpDialog";
import useDialog from "../../../sharedComponents/dialog/useDialog";
import useAutosave from "../hooks/useAutosave";
import { useEditorState } from "../EditorState";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { handleSaveShortcut } from "../editorShortcuts";

const EditorTemplate = ({
  editor,
}: EditorTemplateProps) => {
  const { zoomLevel } = useEditorState();
  const {
    currentLessonId,
    currentLessonTitle,
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

  const {
    isSaving,
    lastSavedAt,
    hasUnsavedChanges,
    triggerManualSave,
    markSaved,
  } = useAutosave({
    editor,
    currentLessonId,
    onSave: async () => {
      await saveLesson(currentLessonTitle);
    },
    delayMs: 2500,
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
    openDocument: async (name) => {
      if (await openLesson(name)) {
        markSaved();
      }
    },
    saveDocument: async (name) => {
      await saveLesson(name);
      markSaved();
    },
    saveDocumentAs: async (name) => {
      await saveLessonAs(name);
      markSaved();
    },
  });

  const handleSaveDocument = () => {
    if (currentLessonId) {
      void triggerManualSave();
    } else {
      openFileDialog("saveDocumentAs");
    }
  };

  useEffect(() => {
    if (!editor) {
      return;
    }

    const saveShortcutPluginKey = new PluginKey("editorSaveShortcut");
    const saveShortcutPlugin = new Plugin({
      key: saveShortcutPluginKey,
      props: {
        handleKeyDown: (_view, event) => {
          return handleSaveShortcut(event, {
            currentLessonId,
            currentLessonTitle,
            saveLesson: () => triggerManualSave(),
            openSaveDialog: () => openFileDialog("saveDocumentAs"),
          });
        },
      },
    });

    editor.registerPlugin(saveShortcutPlugin);
    return () => {
      editor.unregisterPlugin(saveShortcutPluginKey);
    };
  }, [editor, currentLessonId, currentLessonTitle, triggerManualSave, openFileDialog]);

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

  const helpDialogRef = useRef<HTMLDialogElement>(null!);
  const helpDialogControls = useDialog({ ref: helpDialogRef });

  return (
    <>
      <StyledEditorTemplate>
        <Ribbon
          editor={editor}
          openFileDialog={openFileDialog}
          onSaveDocument={handleSaveDocument}
          saveStatus={
            isSaving
              ? "Saving…"
              : hasUnsavedChanges
                ? "Unsaved changes"
                : lastSavedAt
                  ? "Saved"
                  : undefined
          }
          openMediaDialog={openMediaDialog}
          openSpellingGrammarDialog={
            spellingGrammarDialogControls.openDialog
          }
          openTrackChangesDialog={
            trackChangesDialogControls.openDialog
          }
          openHelpDialog={helpDialogControls.openDialog}
        />

        <div
          className="editor-shell"
          aria-label="Lesson editor body"
          style={{ "--editor-zoom": zoomLevel } as CSSProperties}
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

      <HelpDialog
        dialogRef={helpDialogRef}
        controls={helpDialogControls}
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
