import { useQuery } from '@apollo/client/react';

import { AI_GENERATED_ASSETS_GQL, type AiGeneratedAsset } from '../../../../queries/aiVideoQueries';
import type { CharacterAsset } from './characters.types';

const useCharacters = () => {
  const { data, loading, error } = useQuery(AI_GENERATED_ASSETS_GQL, {
    variables: { type: 'character' },
    fetchPolicy: 'cache-and-network',
  });

  const characters: CharacterAsset[] = ((data?.aiGeneratedAssets?.items ?? []) as AiGeneratedAsset[]).map((item) => ({
    id: item.id,
    name: item.name || 'Untitled character',
    role: item.projectTitle ? `${item.projectTitle}${item.sceneTitle ? ` / ${item.sceneTitle}` : ''}` : 'Character asset',
  }));

  return {
    characters,
    isLoading: loading,
    error: error?.message ?? null,
  };
};

export default useCharacters;
