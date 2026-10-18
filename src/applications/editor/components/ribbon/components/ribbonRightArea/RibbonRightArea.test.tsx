import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockEditorState = {
  zoomLevel: 1.25,
  setZoomLevel: vi.fn(),
};

vi.mock("../../../../EditorState", () => ({
  useEditorState: () => mockEditorState,
}));

const ribbonItemMock = vi.fn();

vi.mock("../RibbonItem", () => ({
  default: (props: { label: string; icon?: string; action?: () => void }) => {
    ribbonItemMock(props);
    return (
      <button
        type="button"
        data-testid="ribbon-help-button"
        aria-label={props.label}
        data-icon={props.icon}
        onClick={() => props.action?.()}
      >
        {props.label}
      </button>
    );
  },
}));

import RibbonRightArea from "./RibbonRightArea";

describe("RibbonRightArea component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders zoom percentage based on current zoom level", () => {
    const html = renderToStaticMarkup(<RibbonRightArea />);

    expect(html).toContain('aria-label="Ribbon right area"');
    expect(html).toContain("125%");
  });

  it("renders the help button", () => {
    const html = renderToStaticMarkup(<RibbonRightArea />);

    expect(html).toContain('data-testid="ribbon-help-button"');
    expect(html).toContain('aria-label="Help"');
    expect(html).toContain('data-icon="help"');
  });

  it("triggers onOpenHelp when Help button action is executed", () => {
    const onOpenHelpMock = vi.fn();

    renderToStaticMarkup(<RibbonRightArea onOpenHelp={onOpenHelpMock} />);

    expect(ribbonItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        label: "Help",
        icon: "help",
        action: expect.any(Function),
      })
    );

    const passedProps = ribbonItemMock.mock.calls[0]?.[0];
    passedProps.action();

    expect(onOpenHelpMock).toHaveBeenCalledOnce();
  });
});

