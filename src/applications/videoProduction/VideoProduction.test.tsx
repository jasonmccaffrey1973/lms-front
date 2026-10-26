import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("./index", () => ({
    Characters: () => <div>characters-panel</div>,
    Scenes: () => <div>scenes-panel</div>,
    Equipment: () => <div>equipment-panel</div>,
}));

vi.mock("./components/VideoProductionTabs", () => ({
    default: ({ activeTab }: { activeTab: string }) => <div data-active-tab={activeTab}>tabs</div>,
}));

import VideoProduction from "./VideoProduction";

describe("VideoProduction route tab rendering", () => {
    it("renders the characters panel for the characters route tab", () => {
        const html = renderToStaticMarkup(<VideoProduction tab="characters" />);

        expect(html).toContain("characters-panel");
        expect(html).toContain('data-active-tab="characters"');
        expect(html).not.toContain("scenes-panel");
        expect(html).not.toContain("equipment-panel");
    });

    it("renders the scenes panel for the scenes route tab", () => {
        const html = renderToStaticMarkup(<VideoProduction tab="scenes" />);

        expect(html).toContain("scenes-panel");
        expect(html).toContain('data-active-tab="scenes"');
        expect(html).not.toContain("characters-panel");
        expect(html).not.toContain("equipment-panel");
    });

    it("renders the equipment panel for the equipment route tab", () => {
        const html = renderToStaticMarkup(<VideoProduction tab="equipment" />);

        expect(html).toContain("equipment-panel");
        expect(html).toContain('data-active-tab="equipment"');
        expect(html).not.toContain("characters-panel");
        expect(html).not.toContain("scenes-panel");
    });
});