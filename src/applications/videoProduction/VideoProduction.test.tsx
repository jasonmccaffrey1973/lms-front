import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockedUseQuery } = vi.hoisted(() => ({
    mockedUseQuery: vi.fn(),
}));

vi.mock("./index", () => ({
    Characters: () => <div>characters-panel</div>,
    Scenes: () => <div>scenes-panel</div>,
    Equipment: () => <div>equipment-panel</div>,
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

    return {
        ...actual,
        Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
            <a href={to} {...props}>{children}</a>
        ),
    };
});

vi.mock("./components/VideoProductionTabs", () => ({
    default: ({ activeTab }: { activeTab: string }) => <div data-active-tab={activeTab}>tabs</div>,
}));

vi.mock("../../sharedComponents/miniEditor/MiniEditor", () => ({
    default: ({ label, value }: { label: string; value: string }) => (
        <div data-testid={label}>{value || "mini-editor"}</div>
    ),
}));

vi.mock("@apollo/client/react", () => ({
    useMutation: () => [vi.fn(), { loading: false, error: undefined }],
    useQuery: mockedUseQuery,
}));

import VideoProduction from "./VideoProduction";

describe("VideoProduction route tab rendering", () => {
    beforeEach(() => {
        mockedUseQuery.mockReturnValue({
            data: { aiVideoProjects: [] },
            loading: false,
            error: undefined,
            refetch: vi.fn(),
        });
    });
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

    it("shows the project-creation form only on the project route", () => {
        const html = renderToStaticMarkup(<VideoProduction tab="scenes" mode="create-project" />);

        expect(html).toContain("Create AI Project");
        expect(html).toContain("Project title");
    });

    it("shows the selected project overview and scene statuses in create-project mode", () => {
        mockedUseQuery.mockReturnValue({
            data: {
                aiVideoProjects: [
                    {
                        id: "project-1",
                        title: "Launch teaser",
                        status: "draft",
                        scenes: [
                            { id: "scene-1", title: "Opening shot", status: "queued" },
                            { id: "scene-2", title: "Close-up", status: "generating" },
                        ],
                    },
                ],
            },
            loading: false,
            error: undefined,
            refetch: vi.fn(),
        });

        const html = renderToStaticMarkup(<VideoProduction tab="scenes" mode="create-project" />);

        expect(html).toContain("Project overview");
        expect(html).toContain("Launch teaser");
        expect(html).toContain("Opening shot: queued");
        expect(html).toContain("Close-up: generating");
    });
});