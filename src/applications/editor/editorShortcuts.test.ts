import { describe, expect, it, vi } from "vitest";
import { handleSaveShortcut, isSaveShortcut } from "./editorShortcuts";

const keyEvent = (overrides: Partial<KeyboardEvent> = {}) => ({
  key: "s",
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  altKey: false,
  isComposing: false,
  preventDefault: vi.fn(),
  ...overrides,
}) as unknown as KeyboardEvent;

describe("editor save shortcut", () => {
  it.each([
    ["Ctrl+S", { ctrlKey: true }],
    ["Cmd+S", { metaKey: true }],
  ])("recognizes %s", (_label, modifiers) => {
    expect(isSaveShortcut(keyEvent(modifiers))).toBe(true);
  });

  it.each([
    ["plain S", { }],
    ["Shift+Ctrl+S", { ctrlKey: true, shiftKey: true }],
    ["Alt+Ctrl+S", { ctrlKey: true, altKey: true }],
    ["composing input", { ctrlKey: true, isComposing: true }],
    ["another key", { ctrlKey: true, key: "o" }],
  ])("does not recognize %s", (_label, modifiers) => {
    expect(isSaveShortcut(keyEvent(modifiers))).toBe(false);
  });

  it("saves the current lesson and prevents the browser action", () => {
    const event = keyEvent({ ctrlKey: true });
    const saveLesson = vi.fn().mockResolvedValue(undefined);
    const openSaveDialog = vi.fn();

    expect(handleSaveShortcut(event, {
      currentLessonId: "lesson-1",
      currentLessonTitle: "Current lesson",
      saveLesson,
      openSaveDialog,
    })).toBe(true);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(saveLesson).toHaveBeenCalledWith("Current lesson");
    expect(openSaveDialog).not.toHaveBeenCalled();
  });

  it("opens the Save dialog for an unnamed lesson", () => {
    const event = keyEvent({ metaKey: true });
    const saveLesson = vi.fn().mockResolvedValue(undefined);
    const openSaveDialog = vi.fn();

    expect(handleSaveShortcut(event, {
      currentLessonId: null,
      currentLessonTitle: "",
      saveLesson,
      openSaveDialog,
    })).toBe(true);

    expect(saveLesson).not.toHaveBeenCalled();
    expect(openSaveDialog).toHaveBeenCalledOnce();
  });
});
