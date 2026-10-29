import Button from '../../../../sharedComponents/Button/Button';
import Render from '../../../../sharedComponents/Render';
import useScenes from './useScenes';
import { StyledScenesPage } from './scenes.styles';

const Scenes = () => {
  const { projectId, sceneId, scenes, selectedScene, form, isLoading, isSaving, error, setSceneId, handleFieldChange, saveScene } = useScenes();

  return (
    <StyledScenesPage>
      <div className="scene-header">
        <h3>Scenes</h3>
        {selectedScene ? <span className="status">{selectedScene.status ?? 'draft'}</span> : null}
      </div>

      <Render if={isLoading}>
        <p>Loading scenes…</p>
      </Render>

      <Render if={!isLoading && !scenes.length}>
        <p>No scenes available for this project yet.</p>
      </Render>

      <Render if={!isLoading && scenes.length === 0}>
        <div className="scene-form">
          <p>No scenes have been created for this project yet. Use the project builder to define your next scene.</p>
        </div>
      </Render>

      <Render if={!isLoading && scenes.length > 0}>
        <div className="scene-form">
          <div className="field">
            <label htmlFor="video-scene-select">Scene</label>
            <select
              id="video-scene-select"
              value={sceneId ?? ''}
              onChange={(event) => setSceneId(event.target.value || null)}
            >
              {scenes.map((scene) => (
                <option key={scene.id} value={scene.id}>
                  {scene.title}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="scene-title">Title</label>
            <input
              id="scene-title"
              value={form.title}
              onChange={(event) => handleFieldChange('title', event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="scene-script">Script</label>
            <textarea
              id="scene-script"
              value={form.script}
              onChange={(event) => handleFieldChange('script', event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="scene-prompt">Visual prompt</label>
            <textarea
              id="scene-prompt"
              value={form.visual_prompt}
              onChange={(event) => handleFieldChange('visual_prompt', event.target.value)}
            />
          </div>

          <div className="actions">
            <Button
              type="button"
              color="primary"
              onClick={saveScene}
              disabled={isSaving || !selectedScene || !projectId}
            >
              {isSaving ? 'Saving…' : 'Save scene'}
            </Button>
          </div>

          <Render if={Boolean(error)}>
            <p role="alert">{error}</p>
          </Render>
        </div>
      </Render>
    </StyledScenesPage>
  );
};

export default Scenes;