export type SceneFormState = {
  title: string;
  script: string;
  visual_prompt: string;
};

export type ScenesHookState = {
  projectId: string | null;
  sceneId: string | null;
  scenes: Array<{
    id: string;
    title: string;
    script?: string | null;
    visual_prompt?: string | null;
    status?: string | null;
  }>;
  form: SceneFormState;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};
