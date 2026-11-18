import { useState, type FormEvent } from 'react';
import type { AIConnection, SaveConnectionHandler } from '../../aISettings.types';
import useNewAIForm from '../newAIForm/useNewAIForm';
import buildAIConnectionFormFields from '../AIForm/buildAIConnectionFormFields';

interface UseAICardOptions {
  model: AIConnection;
  onSave: SaveConnectionHandler;
  isSaving: boolean;
}

const useAICard = ({ model, onSave, isSaving }: UseAICardOptions) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const form = useNewAIForm({
    initialConnection: model,
    isSaving,
    onSave: (input) => onSave(input, model.id),
  });

  const stopEditing = () => {
    setIsEditing(false);
    setIsExpanded(false);
  };

  const editCard = () => {
    setIsEditing(true);
    setIsExpanded(true);
  };

  const toggleExpanded = () => (isEditing ? stopEditing() : setIsExpanded((prev) => !prev));

  const { allFields: fields } = buildAIConnectionFormFields({
    providerKey: form.providerKey,
    providerOptions: form.providerOptions,
    onProviderChange: (value) => form.onProviderChange(value),
    name: form.name,
    onNameChange: form.setName,
    service: form.service,
    serviceOptions: form.provider?.services ?? [form.service],
    onServiceChange: form.setService,
    baseUrl: form.baseUrl,
    onBaseUrlChange: form.setBaseUrl,
    credentialFields: form.provider?.credentialFields ?? [],
    credentials: form.credentials,
    credentialPlaceholder: form.credentialPlaceholder,
    isCredentialRequired: form.isCredentialRequired,
    onCredentialChange: form.onCredentialChange,
    hasStoredCredential: (key) => Boolean(model.hasCredentials || model.credentialKeys?.includes(key)),
    modelIds: form.modelIds,
    onModelIdsChange: form.setModelIds,
    disabled: !isEditing,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const saved = await form.onSubmit(event);
    if (saved) stopEditing();
  };

  return {
    isExpanded,
    toggleExpanded,
    isEditing,
    editCard,
    stopEditing,
    fields,
    form,
    handleSubmit,
  };
};

export default useAICard;
