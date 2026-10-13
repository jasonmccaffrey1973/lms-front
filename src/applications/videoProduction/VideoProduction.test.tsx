import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("./index", () => ({
    Characters: () => <div>characters-panel</div>,
    Locations: () => <div>locations-panel</div>,
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
        expect(html).not.toContain("locations-panel");
        expect(html).not.toContain("equipment-panel");
    });

    it("renders the locations panel for the locations route tab", () => {
        const html = renderToStaticMarkup(<VideoProduction tab="locations" />);

        expect(html).toContain("locations-panel");
        expect(html).toContain('data-active-tab="locations"');
        expect(html).not.toContain("characters-panel");
        expect(html).not.toContain("equipment-panel");
    });

    it("renders the equipment panel for the equipment route tab", () => {
        const html = renderToStaticMarkup(<VideoProduction tab="equipment" />);

        expect(html).toContain("equipment-panel");
        expect(html).toContain('data-active-tab="equipment"');
        expect(html).not.toContain("characters-panel");
        expect(html).not.toContain("locations-panel");
    });
});