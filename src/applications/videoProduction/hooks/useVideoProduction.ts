import { useMutation, useQuery } from '@apollo/client/react';
import { print } from 'graphql';
import { useRef, useState, type FormEvent } from 'react';

import { getAuthToken } from '../../../auth/tokenStore';
import {
  AI_VIDEO_PROJECTS_GQL,
  CREATE_AI_VIDEO_PROJECT_GQL,
  CREATE_AI_VIDEO_SCENE_GQL,
  IMPORT_AI_VIDEO_GQL,
  type AiVideoProject,
} from '../../../queries/aiVideoQueries';
import useDialog from '../../../sharedComponents/dialog/useDialog';
import type { VideoProductionDialogState, VideoProductionTab } from '../types';

const tabMap: Record<VideoProductionTab, VideoProductionDialogState> = {
  characters: {
    title: 'Add Character',
    submitLabel: 'Add Character',
  },
  scenes: {
    title: 'Add Scene',
    submitLabel: 'Add Scene',
  },
  equipment: {
    title: 'Add Equipment',
    submitLabel: 'Add Equipment',
  },
};

const normalizeTab = (tab: string): VideoProductionTab => {
  const normalizedTab = (tab ?? 'characters').toLowerCase();

  if (normalizedTab === 'characters' || normalizedTab === 'scenes' || normalizedTab === 'equipment') {
    return normalizedTab;
  }

  return 'characters';
};

const useVideoProduction = (initialTab: string) => {
  const activeTab = normalizeTab(initialTab);
  const videoProductionModalRef = useRef<HTMLDialogElement>(null);
  const dialogControls = useDialog({ ref: videoProductionModalRef });
  const [dialogItems, setDialogItems] = useState<VideoProductionDialogState>(tabMap[activeTab]);
  const [projectTitle, setProjectTitle] = useState('');
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [isImportingVideo, setIsImportingVideo] = useState(false);
  const [importVideoError, setImportVideoError] = useState<string | null>(null);

  const { data, loading: isProjectLoading, error: projectError, refetch } = useQuery(AI_VIDEO_PROJECTS_GQL, {
    fetchPolicy: 'cache-and-network',
  });

  const projects = data?.aiVideoProjects ?? [];
  const selectedProject = projects[0] as AiVideoProject | undefined;
  const resolvedSelectedSceneId =
    selectedSceneId && selectedProject?.scenes?.some((scene) => scene.id === selectedSceneId)
      ? selectedSceneId
      : selectedProject?.scenes?.[0]?.id ?? null;
  const selectedScene =
    selectedProject?.scenes?.find((scene) => scene.id === resolvedSelectedSceneId) ?? selectedProject?.scenes?.[0] ?? null;

  const [createProjectMutation, { loading: isCreatingProject, error: createProjectError }] = useMutation(
    CREATE_AI_VIDEO_PROJECT_GQL,
    {
      refetchQueries: [{ query: AI_VIDEO_PROJECTS_GQL }],
    },
  );

  const [createSceneMutation, { loading: isCreatingScene, error: createSceneError }] = useMutation(
    CREATE_AI_VIDEO_SCENE_GQL,
    {
      refetchQueries: [{ query: AI_VIDEO_PROJECTS_GQL }],
    },
  );

  const importVideoToScene = async (sceneId: string, file: File) => {
    if (!sceneId || !file) {
      return null;
    }

    setIsImportingVideo(true);
    setImportVideoError(null);

    const endpoint = import.meta.env.VITE_GRAPHQL_HTTP_URL || '/graphql';
    const formData = new FormData();

    const operations = {
      query: print(IMPORT_AI_VIDEO_GQL),
      variables: {
        sceneId,
        video: null,
      },
    };

    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify({ '0': ['variables.video'] }));
    formData.append('0', file, file.name);

    try {
      const token = getAuthToken();
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!response.ok) {
        throw new Error(`Upload failed (${response.status})`);
      }

      const payload = await response.json();
      if (payload.errors?.length) {
        throw new Error(payload.errors.map((error: { message?: string }) => error.message ?? 'Upload failed').join('; '));
      }

      await refetch();
      return payload.data?.importAiVideo ?? null;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to import the video.';
      setImportVideoError(message);
      return null;
    } finally {
      setIsImportingVideo(false);
    }
  };

  const addCharacter = () => {
    console.log('Add new character');
  };

  const addScene = async (formData?: FormData) => {
    if (!selectedProject) {
      console.warn('No AI video project selected for scene creation.');
      return;
    }

    const title = formData?.get('name')?.toString().trim() ?? 'Untitled scene';
    const description = formData?.get('description')?.toString() ?? '';

    await createSceneMutation({
      variables: {
        projectId: selectedProject.id,
        input: {
          title,
          script: description || undefined,
          visual_prompt: description || undefined,
          position: (selectedProject.scenes_count ?? 0) + 1,
          duration_seconds: 10,
          aspect_ratio: '16:9',
        },
      },
    });
  };

  const addEquipment = () => {
    console.log('Add new equipment');
  };

  const handleAddButtonClick = () => {
    dialogControls.openDialog();
    setDialogItems(tabMap[activeTab]);
  };

  const handleCreateProject = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedTitle = projectTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    await createProjectMutation({
      variables: {
        input: {
          title: trimmedTitle,
          description: 'Created from the AI Video Studio UI',
        },
      },
    });

    setProjectTitle('');
  };

  const handleSubmit = async (formData?: FormData) => {
    switch (activeTab) {
      case 'characters':
        addCharacter();
        break;
      case 'scenes':
        await addScene(formData);
        break;
      case 'equipment':
        addEquipment();
        break;
      default:
        console.log(`Add new ${activeTab}`);
    }

    dialogControls.closeDialog();
  };

  return {
    activeTab,
    handleAddButtonClick,
    handleSubmit,
    handleCreateProject,
    importVideoToScene,
    selectedProject,
    selectedScene,
    selectedSceneId: resolvedSelectedSceneId,
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
    isCreatingProject,
    createProjectError,
    isCreatingScene,
    createSceneError,
  };
};

export default useVideoProduction;
