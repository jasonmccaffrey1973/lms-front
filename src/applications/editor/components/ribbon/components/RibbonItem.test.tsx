import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ThemeProvider } from "../../../../../theme";
import RibbonItem from "./RibbonItem";

const renderWithTheme = (node: React.ReactElement) => {
  return renderToStaticMarkup(<ThemeProvider>{node}</ThemeProvider>);
};

describe("RibbonItem component", () => {
  describe("Default Button variant", () => {
    it("renders button with icon and label", () => {
      const html = renderWithTheme(
        <RibbonItem
          label="Bold"
          icon="bold"
          value="bold"
          isActive={false}
        />
      );

      expect(html).toContain('role="button"');
      expect(html).toContain('aria-label="Bold"');
      expect(html).toContain('aria-pressed="false"');
      expect(html).toContain('tabindex="0"');
      expect(html).toContain("Bold");
      expect(html).toContain("<svg");
    });

    it("renders active button state", () => {
      const html = renderWithTheme(
        <RibbonItem
          label="Italic"
          icon="italic"
          value="italic"
          isActive={true}
        />
      );

      expect(html).toContain('aria-pressed="true"');
    });

    it("renders placeholder when no icon is supplied", () => {
      const html = renderWithTheme(
        <RibbonItem
          label="Custom"
          value="custom"
        />
      );

      expect(html).toContain('class="ribbon-item-placeholder"');
      expect(html).toContain("Custom");
    });

    it("invokes action callback with value when clicked", () => {
      const actionMock = vi.fn();

      const element = RibbonItem({
        label: "Underline",
        icon: "underline",
        value: "underline",
        action: actionMock,
      });

      // Execute onClick handler from component's root element
      element.props.onClick();

      expect(actionMock).toHaveBeenCalledWith("underline");
    });

    it("handles action when value is empty string by default", () => {
      const actionMock = vi.fn();

      const element = RibbonItem({
        label: "Clear",
        action: actionMock,
      });

      element.props.onClick();

      expect(actionMock).toHaveBeenCalledWith("");
    });
  });

  describe("Dropdown and Select variants", () => {
    it("renders select dropdown for elementType='select'", () => {
      const options = [
        { label: "Arial", value: "Arial" },
        { label: "Georgia", value: "Georgia" },
      ];

      const html = renderWithTheme(
        <RibbonItem
          elementType="select"
          label="Typeface"
          value="Arial"
          options={options}
        />
      );

      expect(html).toContain("Arial");
      expect(html).toContain("Georgia");
    });

    it("renders list element for elementType='list'", () => {
      const items = [
        { label: "Normal", value: "normal", action: "setStyle" },
        { label: "Heading 1", value: "heading_1", action: "setStyle" },
      ];

      const html = renderWithTheme(
        <RibbonItem
          elementType="list"
          label="Styles"
          items={items}
        />
      );

      expect(html).toContain("Normal");
      expect(html).toContain("Heading 1");
    });

    it("renders button dropdown for Text Color", () => {
      const html = renderWithTheme(
        <RibbonItem
          elementType="buttonDropdown"
          label="Text Color"
          icon="textcolor"
          value="#123456"
        />
      );

      expect(html).toContain('aria-label="Text Color"');
    });

    it("renders button dropdown for Highlight", () => {
      const html = renderWithTheme(
        <RibbonItem
          elementType="buttonDropdown"
          label="Highlight"
          icon="highlight"
          value="#ffff00"
        />
      );

      expect(html).toContain('aria-label="Highlight"');
    });

    it("renders button dropdown for Link", () => {
      const html = renderWithTheme(
        <RibbonItem
          elementType="buttonDropdown"
          label="Link"
          icon="link"
        />
      );

      expect(html).toContain('aria-label="Link"');
    });

    it("renders button dropdown for Table", () => {
      const html = renderWithTheme(
        <RibbonItem
          elementType="buttonDropdown"
          label="Table"
          icon="table"
        />
      );

      expect(html).toContain('aria-label="Table"');
    });

    it("renders button dropdown for Zoom", () => {
      const html = renderWithTheme(
        <RibbonItem
          elementType="buttonDropdown"
          label="Zoom"
          value="1.5"
        />
      );

      expect(html).toContain('aria-label="Zoom"');
    });
  });
});
