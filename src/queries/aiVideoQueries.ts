import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@apollo/client';

export type AiVideoProjectStatus = 'draft' | 'in_production' | 'review' | 'approved' | 'archived';
export type AiVideoSceneStatus = 'draft' | 'queued' | 'generating' | 'review' | 'approved' | 'failed';
export type AiVideoJobStatus = 'queued' | 'processing' | 'succeeded' | 'failed' | 'cancelled';

export interface AiVideoProject {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  status: AiVideoProjectStatus;
  scenes_count?: number | null;
  scenes?: AiVideoScene[];
  created_at: string;
  updated_at: string;
}

export interface AiVideoScene {
  id: string;
  ai_video_project_id: string;
  title: string;
  position: number;
  script?: string | null;
  visual_prompt?: string | null;
  character_asset_id?: string | null;
  location_asset_id?: string | null;
  output_asset_id?: string | null;
  duration_seconds: number;
  aspect_ratio: string;
  status: AiVideoSceneStatus;
  created_at: string;
  updated_at: string;
}

export interface AiVideoGenerationJob {
  id: string;
  ai_video_scene_id: string;
  provider: string;
  status: AiVideoJobStatus;
  provider_job_id?: string | null;
  parameters?: Record<string, unknown> | null;
  error_message?: string | null;
  started_at?: string | null;
  finished_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type AiVideoProjectsQueryData = {
  aiVideoProjects: AiVideoProject[];
};

export type ImportAiVideoMutationData = {
  importAiVideo: AiVideoGenerationJob;
};

export type ImportAiVideoMutationVariables = {
  sceneId: string;
  video: File;
};

export type CreateAiVideoProjectMutationData = {
  createAiVideoProject: AiVideoProject;
};

export type CreateAiVideoProjectMutationVariables = {
  input: {
    title: string;
    description?: string | null;
  };
};

export type CreateAiVideoSceneMutationData = {
  createAiVideoScene: AiVideoScene;
};

export type AiGeneratedAsset = {
  id: string;
  type: string;
  name: string;
  url?: string | null;
  mimeType?: string | null;
  projectTitle?: string | null;
  sceneTitle?: string | null;
};

export type AiGeneratedAssetsQueryData = {
  aiGeneratedAssets: {
    total: number;
    items: AiGeneratedAsset[];
  };
};

export type AiGeneratedAssetsQueryVariables = {
  type: string;
};

export type UpdateAiVideoSceneMutationData = {
  updateAiVideoScene: AiVideoScene;
};

export type CreateAiVideoSceneMutationVariables = {
  projectId: string;
  input: {
    title: string;
    position?: number;
    script?: string | null;
    visual_prompt?: string | null;
    character_asset_id?: string | null;
    location_asset_id?: string | null;
    duration_seconds?: number;
    aspect_ratio?: string;
  };
};

export type UpdateAiVideoSceneMutationVariables = {
  sceneId: string;
  input: {
    title?: string | null;
    script?: string | null;
    visual_prompt?: string | null;
    status?: AiVideoSceneStatus | null;
    duration_seconds?: number | null;
    aspect_ratio?: string | null;
  };
};

export const AI_VIDEO_PROJECTS_GQL = gql`
  query AiVideoProjects {
    aiVideoProjects {
      id
      user_id
      title
      description
      status
      scenes_count
      scenes {
        id
        ai_video_project_id
        title
        position
        script
        visual_prompt
        status
      }
      created_at
      updated_at
    }
  }
` as TypedDocumentNode<AiVideoProjectsQueryData>;

export const IMPORT_AI_VIDEO_GQL = gql`
  mutation ImportAiVideo($sceneId: ID!, $video: Upload!) {
    importAiVideo(sceneId: $sceneId, video: $video) {
      id
      ai_video_scene_id
      provider
      status
      error_message
      started_at
      finished_at
    }
  }
` as TypedDocumentNode<ImportAiVideoMutationData, ImportAiVideoMutationVariables>;

export const CREATE_AI_VIDEO_PROJECT_GQL = gql`
  mutation CreateAiVideoProject($input: CreateAiVideoProjectInput!) {
    createAiVideoProject(input: $input) {
      id
      user_id
      title
      description
      status
      scenes_count
      created_at
      updated_at
    }
  }
` as TypedDocumentNode<CreateAiVideoProjectMutationData, CreateAiVideoProjectMutationVariables>;

export const CREATE_AI_VIDEO_SCENE_GQL = gql`
  mutation CreateAiVideoScene($projectId: ID!, $input: CreateAiVideoSceneInput!) {
    createAiVideoScene(projectId: $projectId, input: $input) {
      id
      ai_video_project_id
      title
      position
      script
      visual_prompt
      duration_seconds
      aspect_ratio
      status
      created_at
      updated_at
    }
  }
` as TypedDocumentNode<CreateAiVideoSceneMutationData, CreateAiVideoSceneMutationVariables>;

export const AI_GENERATED_ASSETS_GQL = gql`
  query AiGeneratedAssets($type: String!) {
    aiGeneratedAssets(type: $type) {
      total
      items {
        id
        type
        name
        url
        mimeType
        projectTitle
        sceneTitle
      }
    }
  }
` as TypedDocumentNode<AiGeneratedAssetsQueryData, AiGeneratedAssetsQueryVariables>;

export const UPDATE_AI_VIDEO_SCENE_GQL = gql`
  mutation UpdateAiVideoScene($sceneId: ID!, $input: UpdateAiVideoSceneInput!) {
    updateAiVideoScene(sceneId: $sceneId, input: $input) {
      id
      ai_video_project_id
      title
      position
      script
      visual_prompt
      duration_seconds
      aspect_ratio
      status
      created_at
      updated_at
    }
  }
` as TypedDocumentNode<UpdateAiVideoSceneMutationData, UpdateAiVideoSceneMutationVariables>;
