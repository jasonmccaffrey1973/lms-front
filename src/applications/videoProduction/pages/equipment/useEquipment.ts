import { useQuery } from '@apollo/client/react';

import { AI_GENERATED_ASSETS_GQL, type AiGeneratedAsset } from '../../../../queries/aiVideoQueries';
import type { EquipmentAsset } from './equipment.types';

const useEquipment = () => {
  const { data, loading, error } = useQuery(AI_GENERATED_ASSETS_GQL, {
    variables: { type: 'equipment' },
    fetchPolicy: 'cache-and-network',
  });

  const equipment: EquipmentAsset[] = ((data?.aiGeneratedAssets?.items ?? []) as AiGeneratedAsset[]).map((item) => ({
    id: item.id,
    name: item.name || 'Untitled equipment',
    description: item.projectTitle ? `${item.projectTitle}${item.sceneTitle ? ` / ${item.sceneTitle}` : ''}` : 'Equipment asset',
  }));

  return {
    equipment,
    isLoading: loading,
    error: error?.message ?? null,
  };
};

export default useEquipment;
