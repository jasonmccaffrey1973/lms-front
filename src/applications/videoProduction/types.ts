export type VideoProductionTab = 'characters' | 'scenes' | 'equipment';

export interface VideoProductionDialogState {
  title: string;
  submitLabel: string;
}

export interface SceneFormValues {
  name: string;
  description: string;
}
