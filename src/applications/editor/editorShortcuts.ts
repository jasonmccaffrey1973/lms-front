export interface SaveShortcutActions {
  currentLessonId: string | null;
  currentLessonTitle: string;
  saveLesson: (title: string) => Promise<void>;
  openSaveDialog: () => void;
}

export const isSaveShortcut = (event: KeyboardEvent): boolean =>
  event.key.toLowerCase() === "s" &&
  (event.ctrlKey || event.metaKey) &&
  !event.shiftKey &&
  !event.altKey &&
  !event.isComposing;

export const handleSaveShortcut = (
  event: KeyboardEvent,
  actions: SaveShortcutActions,
): boolean => {
  if (!isSaveShortcut(event)) {
    return false;
  }

  event.preventDefault();
  if (actions.currentLessonId) {
    void actions.saveLesson(actions.currentLessonTitle).catch((error: unknown) => {
      console.error("Failed to save lesson:", error);
    });
  } else {
    actions.openSaveDialog();
  }

  return true;
};
