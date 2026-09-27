import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/core";

export interface UseAutosaveOptions {
  editor: Editor | null;
  currentLessonId: string | null;
  onSave: (name?: string) => Promise<void>;
  delayMs?: number;
  enabled?: boolean;
}

export interface UseAutosaveReturn {
  isSaving: boolean;
  lastSavedAt: Date | null;
  hasUnsavedChanges: boolean;
  triggerManualSave: () => Promise<void>;
}

export const useAutosave = ({
  editor,
  currentLessonId,
  onSave,
  delayMs = 2500,
  enabled = true,
}: UseAutosaveOptions): UseAutosaveReturn => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSaveRef = useRef(onSave);
  const isSavingRef = useRef(isSaving);

  // Keep callback reference updated
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    isSavingRef.current = isSaving;
  }, [isSaving]);

  const performSave = async () => {
    if (!currentLessonId || isSavingRef.current) return;

    try {
      setIsSaving(true);
      await onSaveRef.current();
      setLastSavedAt(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Autosave failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!editor || !enabled || !currentLessonId) {
      return;
    }

    const handleUpdate = () => {
      setHasUnsavedChanges(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        void performSave();
      }, delayMs);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [editor, currentLessonId, delayMs, enabled]);

  const triggerManualSave = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    await performSave();
  };

  return {
    isSaving,
    lastSavedAt,
    hasUnsavedChanges,
    triggerManualSave,
  };
};

export default useAutosave;
