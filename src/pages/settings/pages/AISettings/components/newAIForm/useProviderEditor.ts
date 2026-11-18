import { useState } from 'react';
import type { AIServiceType } from '../../aISettings.types';
import type { ProviderDraft, UseProviderEditorOptions, UseProviderEditorReturn } from './newAIForm.types';

const INITIAL_PROVIDER_DRAFT: ProviderDraft = {
  key: '',
  name: '',
  services: ['text'],
  defaultBaseUrl: '',
  authType: 'api-key',
  credentialFieldKey: 'apiKey',
  credentialFieldLabel: 'API key',
  credentialFieldSecret: true,
  credentialHeader: '',
  apiKeyUrl: '',
};

const useProviderEditor = ({ onCreateProvider }: UseProviderEditorOptions): UseProviderEditorReturn => {
  const [isProviderEditorOpen, setIsProviderEditorOpen] = useState(false);
  const [providerDraftError, setProviderDraftError] = useState<string | null>(null);
  const [providerDraft, setProviderDraft] = useState<ProviderDraft>(INITIAL_PROVIDER_DRAFT);

  const toggleProviderEditor = () => {
    setIsProviderEditorOpen((current) => !current);
  };

  const updateProviderDraft: UseProviderEditorReturn['updateProviderDraft'] = (key, value) => {
    setProviderDraft((current) => ({ ...current, [key]: value }));
  };

  const toggleServiceSelection = (serviceOption: AIServiceType) => {
    setProviderDraft((current) => {
      const hasService = current.services.includes(serviceOption);
      if (hasService) {
        if (current.services.length === 1) return current;
        return { ...current, services: current.services.filter((item) => item !== serviceOption) };
      }
      return { ...current, services: [...current.services, serviceOption] };
    });
  };

  const handleCreateProvider = async () => {
    setProviderDraftError(null);
    const normalizedProviderKey = providerDraft.key.trim().toLowerCase();
    if (!normalizedProviderKey || !providerDraft.name.trim() || providerDraft.services.length === 0 || !providerDraft.defaultBaseUrl.trim()) {
      setProviderDraftError('Provider key, name, valid services, and default base URL are required.');
      return;
    }
    if (!providerDraft.credentialFieldKey.trim() || !providerDraft.credentialFieldLabel.trim()) {
      setProviderDraftError('Credential field key and label are required.');
      return;
    }

    const created = await onCreateProvider({
      key: normalizedProviderKey,
      name: providerDraft.name.trim(),
      services: providerDraft.services,
      defaultBaseUrl: providerDraft.defaultBaseUrl.trim(),
      authType: providerDraft.authType,
      credentialFields: [{
        key: providerDraft.credentialFieldKey.trim(),
        label: providerDraft.credentialFieldLabel.trim(),
        secret: providerDraft.credentialFieldSecret,
      }],
      credentialHeader: providerDraft.credentialHeader.trim() || undefined,
      apiKeyUrl: providerDraft.apiKeyUrl.trim() || undefined,
    });

    if (created) {
      setIsProviderEditorOpen(false);
      setProviderDraft(INITIAL_PROVIDER_DRAFT);
    }
  };

  return {
    isProviderEditorOpen,
    providerDraft,
    providerDraftError,
    toggleProviderEditor,
    updateProviderDraft,
    toggleServiceSelection,
    handleCreateProvider,
  };
};

export default useProviderEditor;
