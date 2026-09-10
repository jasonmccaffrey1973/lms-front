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
          return { fontFamily: "Arial", fontSize: "24px", color: "#336699" };
        }

        if (type === "highlight") {
          return { color: "#ffff00" };
        }

        return {};
      },
    } as unknown as Editor;

    expect(getEditorSelectionState(mockEditor)).toMatchObject({
      bold: true,
      fontFamily: "Arial",
      fontSize: "24px",
      textColor: "#336699",
      highlightColor: "#ffff00",
    });
  });

  it("returns the current selection value for font controls", () => {
    const selection = {
      bold: true,
      fontFamily: "Times New Roman",
      fontSize: "18px",
      textColor: "#123456",
      highlightColor: "#ffeeaa",
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

    expect(
      getRibbonItemValue(
        { label: "Text Color", action: "setTextColor" },
        selection,
      ),
    ).toBe("#123456");

    expect(
      getRibbonItemValue(
        { label: "Highlight", action: "toggleHighlight" },
        selection,
      ),
    ).toBe("#ffeeaa");
  });

  it("defaults size control to 14px when selection has no font size", () => {
    expect(
      getRibbonItemValue(
        { label: "Size", action: "setFontSize" },
        { fontSize: "" },
      ),
    ).toBe("14px");
  });

  it("defaults typeface control to Arial when selection has no font family", () => {
    expect(
      getRibbonItemValue(
        { label: "Typeface", action: "setFontFamily" },
        { fontFamily: "" },
      ),
    ).toBe("Arial");
  });

  it("defaults text color and highlight when selection has no color", () => {
    expect(
      getRibbonItemValue(
        { label: "Text Color", action: "setTextColor" },
        { textColor: "" },
      ),
    ).toBe("#000000");

    expect(
      getRibbonItemValue(
        { label: "Highlight", action: "toggleHighlight" },
        { highlightColor: "" },
      ),
    ).toBe("#ffff00");
  });
});
