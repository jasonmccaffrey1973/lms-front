import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';

import {
  AI_GENERATED_ASSETS_GQL,
  AI_VIDEO_PROJECTS_GQL,
  UPDATE_AI_VIDEO_SCENE_GQL,
  type AiGeneratedAsset,
} from '../../../../queries/aiVideoQueries';
import type { SceneFormState, ScenesHookState } from './scenes.types';

const baseForm = (title = '', script = '', visual_prompt = ''): SceneFormState => ({
  title,
  script,
  visual_prompt,
});

const useScenes = () => {
  const { data: assetData, loading: assetLoading, error: assetError } = useQuery(AI_GENERATED_ASSETS_GQL, {
    variables: { type: 'scene' },
    fetchPolicy: 'cache-and-network',
  });

  const scenes = useMemo(
    () =>
      ((assetData?.aiGeneratedAssets?.items ?? []) as AiGeneratedAsset[]).map((item) => ({
        id: item.id,
        title: item.sceneTitle || item.name || 'Untitled scene',
        script: item.projectTitle ? `Project: ${item.projectTitle}` : undefined,
        visual_prompt: item.url ?? undefined,
        status: 'draft',
      })),
    [assetData?.aiGeneratedAssets?.items],
  );

  const [sceneId, setSceneId] = useState<string | null>(null);
  const [form, setForm] = useState<SceneFormState>(baseForm());

  useEffect(() => {
    if (!scenes.length) {
      setSceneId((current) => (current === null ? current : null));
      setForm((current) => (current.title || current.script || current.visual_prompt ? baseForm() : current));
      return;
    }

    const nextSceneId = sceneId && scenes.some((scene) => scene.id === sceneId) ? sceneId : scenes[0].id;
    const selected = scenes.find((scene) => scene.id === nextSceneId) ?? scenes[0];
    const nextForm = baseForm(selected.title, selected.script ?? '', selected.visual_prompt ?? '');

    setSceneId((current) => (current === nextSceneId ? current : nextSceneId));
    setForm((current) => {
      const hasSameValues =
        current.title === nextForm.title &&
        current.script === nextForm.script &&
        current.visual_prompt === nextForm.visual_prompt;

      return hasSameValues ? current : nextForm;
    });
  }, [scenes, sceneId]);

  const selectedScene = scenes.find((scene) => scene.id === sceneId) ?? scenes[0] ?? null;

  const [updateSceneMutation, { loading: isSaving, error: mutationError }] = useMutation(
    UPDATE_AI_VIDEO_SCENE_GQL,
    {
      refetchQueries: [{ query: AI_VIDEO_PROJECTS_GQL }],
    },
  );

  const handleFieldChange = (field: keyof SceneFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const saveScene = async () => {
    if (!selectedScene) {
      return;
    }

    await updateSceneMutation({
      variables: {
        sceneId: selectedScene.id,
        input: {
          title: form.title.trim() || selectedScene.title,
          script: form.script,
          visual_prompt: form.visual_prompt,
        },
      },
    });
  };

  const hookState: ScenesHookState = {
    projectId: null,
    sceneId,
    scenes,
    form,
    isLoading: assetLoading,
    isSaving,
    error: assetError?.message ?? mutationError?.message ?? null,
  };

  return {
    ...hookState,
    selectedScene,
    setSceneId,
    handleFieldChange,
    saveScene,
  };
};

export default useScenes;
