import { Characters, Scenes, Equipment } from './index'
import useVideoProduction from './hooks/useVideoProduction'
import Render from '../../sharedComponents/Render';
import { TABS } from './constants';
import VideoProductionTabs from './components/VideoProductionTabs';
import {
    StyledAssetCard,
    StyledAssetGrid,
    StyledAssetSelector,
    StyledCreateProjectSection,
    StyledProjectForm,
    StyledProjectOverview,
    StyledVideoProductionPage,
} from './videoProduction.styles';
import Dialog from '../../sharedComponents/dialog/Dialog';
import { AddCharacterForm, AddSceneForm, AddEquipmentForm } from './components';

const VideoProduction = ({ tab, mode = 'assets' } : { tab : string; mode?: 'assets' | 'create-project' }) => {
    const {
        activeTab,
        handleAddButtonClick,
        handleSubmit,
        handleCreateProject,
        importVideoToScene,
        selectedProject,
        selectedScene,
        selectedSceneId,
        setSelectedSceneId,
        isImportingVideo,
        importVideoError,
        videoProductionModalRef,
        dialogControls,
        dialogItems,
        projects,
        projectTitle,
        setProjectTitle,
        isProjectLoading,
        projectError,
    } = useVideoProduction(tab);

    const isCreateProjectMode = mode === 'create-project';
    const projectScenes = selectedProject?.scenes ?? [];

	return (
            <StyledVideoProductionPage>
                <VideoProductionTabs activeTab={activeTab} onAddClick={handleAddButtonClick} />

                <div className="page-body">
                    <Render if={isCreateProjectMode}>
                        <StyledCreateProjectSection aria-label="Create AI video project">
                            <h3>Create AI Project</h3>
                            <StyledProjectForm onSubmit={handleCreateProject}>
                                <input
                                    type="text"
                                    value={projectTitle}
                                    onChange={(event) => setProjectTitle(event.target.value)}
                                    placeholder="Project title"
                                    aria-label="Project title"
                                />
                                <button type="submit" disabled={isProjectLoading}>
                                    {isProjectLoading ? 'Loading…' : 'Create project'}
                                </button>
                            </StyledProjectForm>

                            {projectError ? (
                                <p role="alert">Unable to load AI video projects.</p>
                            ) : null}

                            {projects.length === 0 ? (
                                <p>No AI video projects yet.</p>
                            ) : (
                                <ul>
                                    {projects.map((project) => (
                                        <li key={project.id}>
                                            <strong>{project.title}</strong> — {project.status}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {selectedProject ? (
                                <StyledProjectOverview>
                                    <div className="overview-title">Project overview</div>
                                    <div className="overview-details">
                                        <div>Project: {selectedProject.title}</div>
                                        <div>Status: {selectedProject.status}</div>
                                        <div>Scenes: {projectScenes.length}</div>
                                    </div>

                                    {projectScenes.length > 0 ? (
                                        <div className="scene-tags">
                                            {projectScenes.map((scene) => (
                                                <span key={scene.id} className="scene-tag">
                                                    {scene.title}: {scene.status ?? 'draft'}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                </StyledProjectOverview>
                            ) : null}

                            <StyledAssetGrid>
                                {[
                                    { key: 'characters', label: 'Characters', summary: 'Build character references and personas', link: '/assets/characters' },
                                    { key: 'scenes', label: 'Scenes', summary: 'Define scene blocks, scripts, and prompts', link: '/assets/scenes' },
                                    { key: 'equipment', label: 'Equipment', summary: 'Add props, tools, and production assets', link: '/assets/equipment' },
                                ].map((asset) => (
                                    <StyledAssetCard key={asset.key} to={asset.link}>
                                        <strong>{asset.label}</strong>
                                        <p>{asset.summary}</p>
                                    </StyledAssetCard>
                                ))}
                            </StyledAssetGrid>
                        </StyledCreateProjectSection>
                    </Render>

                    <Render if={Boolean(isCreateProjectMode && selectedProject)}>
                        <StyledAssetSelector>
                            <label>
                                <span>Scene</span>
                                <select
                                    value={selectedSceneId ?? ''}
                                    onChange={(event) => setSelectedSceneId(event.target.value || null)}
                                    aria-label="Select a scene to import video into"
                                >
                                    {projectScenes.length === 0 ? (
                                        <option value="">Create a scene first</option>
                                    ) : (
                                        projectScenes.map((scene) => (
                                            <option key={scene.id} value={scene.id}>
                                                {scene.title}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </label>

                            <label>
                                <span>Import video</span>
                                <input
                                    type="file"
                                    accept="video/*"
                                    disabled={!selectedScene || isImportingVideo}
                                    onChange={async (event) => {
                                        const file = event.target.files?.[0];
                                        if (!file || !selectedScene) {
                                            return;
                                        }

                                        await importVideoToScene(selectedScene.id, file);
                                        event.target.value = '';
                                    }}
                                />
                            </label>

                            {isImportingVideo ? <p>Importing video…</p> : null}
                            {importVideoError ? <p role="alert">{importVideoError}</p> : null}
                        </StyledAssetSelector>
                    </Render>

                    <Render if={activeTab === TABS.CHARACTERS.label.toLowerCase()}>
                        <Characters />
                    </Render>
                    <Render if={activeTab === TABS.SCENES.label.toLowerCase()}>
                        <Scenes />
                    </Render>
                    <Render if={activeTab === TABS.EQUIPMENT.label.toLowerCase()}>
                        <Equipment />
                    </Render>
                </div>

                <Dialog
                    title={dialogItems.title}
                    dialogRef={videoProductionModalRef}
                    controls={dialogControls}
                    footerButtons={[
                        { label: dialogItems.submitLabel, color: 'success', type: 'submit', form: 'video-production-item-form' },
                    ]}
                >
                    <Render if={activeTab === TABS.CHARACTERS.label.toLowerCase()}>
                        <AddCharacterForm handleSubmit={handleSubmit} />
                    </Render>
                    <Render if={activeTab === TABS.SCENES.label.toLowerCase()}>
                        <AddSceneForm handleSubmit={handleSubmit} />
                    </Render>
                    <Render if={activeTab === TABS.EQUIPMENT.label.toLowerCase()}>
                        <AddEquipmentForm handleSubmit={handleSubmit}  />
                    </Render>
                </Dialog>

            </StyledVideoProductionPage>
	)
}

export default VideoProduction
