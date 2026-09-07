import { describe, expect, it } from "vitest";

import { FONT_FAMILIES, FONTS } from "./fontStyles";

describe("FONT_FAMILIES", () => {
  it("is alphabetized", () => {
    const sorted = [...FONT_FAMILIES].sort((a, b) => a.localeCompare(b));

    expect(FONT_FAMILIES).toEqual(sorted);
  });

  it("contains unique font family names", () => {
    expect(new Set(FONT_FAMILIES).size).toBe(FONT_FAMILIES.length);
  });

  it("includes only fonts with valid configured normal paths", () => {
    expect(FONT_FAMILIES.every((family) => {
      const normalPath = FONTS[family]?.normal;

      return (
        typeof normalPath === "string" &&
        normalPath.startsWith("/src/assets/fonts/") &&
        normalPath.endsWith(".ttf")
      );
    })).toBe(true);
  });
});
