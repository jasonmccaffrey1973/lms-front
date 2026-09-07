import type { Editor } from "@tiptap/core";
import { describe, expect, it } from "vitest";

import {
  getEditorSelectionState,
  getRibbonItemValue,
} from "./EditorState";

describe("editor selection state", () => {
  it("reads the active font family and size from text style attributes", () => {
    const mockEditor = {
      isActive: (name: string) => name === "bold",
      getAttributes: (type: string) => {
        if (type === "textStyle") {
          return { fontFamily: "Arial", fontSize: "24px" };
        }

        return {};
      },
    } as unknown as Editor;

    expect(getEditorSelectionState(mockEditor)).toMatchObject({
      bold: true,
      fontFamily: "Arial",
      fontSize: "24px",
    });
  });

  it("returns the current selection value for font controls", () => {
    const selection = {
      bold: true,
      fontFamily: "Times New Roman",
      fontSize: "18px",
    } satisfies Partial<ReturnType<typeof getEditorSelectionState>>;

    expect(
      getRibbonItemValue(
        { label: "Typeface", action: "setFontFamily" },
        selection,
      ),
    ).toBe("Times New Roman");

    expect(
      getRibbonItemValue(
        { label: "Size", action: "setFontSize" },
        selection,
      ),
    ).toBe("18px");
  });

  it("defaults size control to 14px when selection has no font size", () => {
    expect(
      getRibbonItemValue(
        { label: "Size", action: "setFontSize" },
        { fontSize: "" },
      ),
    ).toBe("14px");
  });
});
