import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import type { AIServiceType } from '../../aISettings.types';
import { AI_PROVIDERS } from '../../aiProviders';
import type { UseNewAIFormOptions, UseNewAIFormReturn } from './newAIForm.types';
import { AI_PROVIDERS_GQL, TEST_AI_PROVIDER_CONNECTION_GQL } from '../../../../../../queries/aiProviderConnectionQueries';

const useNewAIForm = ({ initialConnection, onSave, isSaving = false }: UseNewAIFormOptions): UseNewAIFormReturn => {
  const [providerKey, setProviderKey] = useState(initialConnection?.providerKey ?? AI_PROVIDERS[0].id);
  const provider = AI_PROVIDERS.find((item) => item.id === providerKey) ?? AI_PROVIDERS[0];
  const { data: providerData, loading: isLoadingProviders, error: providerError } = useQuery(AI_PROVIDERS_GQL, {
    fetchPolicy: 'cache-and-network',
  });
  const selectedProvider = providerData?.aiProviders.find((item) => item.key === providerKey && item.is_enabled);
  const [name, setName] = useState(initialConnection?.name ?? '');
  const [service, setService] = useState<AIServiceType>(initialConnection?.service ?? provider.services[0]);
  const [baseUrl, setBaseUrl] = useState(initialConnection?.baseUrl ?? provider.defaultBaseUrl);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [modelIds, setModelIds] = useState(initialConnection?.modelIds.join(', ') ?? '');
  const [connectionTestResult, setConnectionTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testAIProviderConnection, { loading: isTestingConnection }] = useMutation(TEST_AI_PROVIDER_CONNECTION_GQL);

  const handleProviderChange = (nextProviderKeyOrEvent: string | React.ChangeEvent<HTMLSelectElement>) => {
    const nextKey = typeof nextProviderKeyOrEvent === 'string' ? nextProviderKeyOrEvent : nextProviderKeyOrEvent.target.value;
    const nextProvider = AI_PROVIDERS.find((item) => item.id === nextKey) ?? AI_PROVIDERS[0];
    setProviderKey(nextKey);
    setService(nextProvider.services[0]);
    setBaseUrl(nextProvider.defaultBaseUrl);
    setCredentials({});
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setService(event.target.value as AIServiceType);
  };

  const handleBaseUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseUrl(event.target.value);
  };

  const handleModelIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelIds(event.target.value);
  };

  const handleCredentialChange = (fieldKey: string, value: string) => {
    setCredentials((current) => ({ ...current, [fieldKey]: value }));
  };

  const handleCredentialInputChange = (fieldKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCredentialChange(fieldKey, event.target.value);
  };

  const handleGetApiKey = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (typeof window !== 'undefined' && provider.apiKeyUrl) {
      window.open(provider.apiKeyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProvider) return;
    await onSave({
      providerId: selectedProvider.id,
      name: name.trim(),
      service,
      baseUrl: baseUrl.trim(),
      authType: provider.authType,
      credentials,
      modelIds: modelIds.split(',').map((item) => item.trim()).filter(Boolean),
    });
  };

  const testConnection = async () => {
    setConnectionTestResult(null);
    if (!selectedProvider) {
      setConnectionTestResult({ success: false, message: 'Select a provider configured by the backend first.' });
      return;
    }
    try {
      const { data } = await testAIProviderConnection({
        variables: {
          id: initialConnection?.id,
          input: {
            providerId: selectedProvider.id,
            name: name.trim(),
            service,
            baseUrl: baseUrl.trim(),
            authType: provider.authType,
            credentials: Object.entries(credentials).map(([key, value]) => ({ key, value })),
            modelIds: modelIds.split(',').map((item) => item.trim()).filter(Boolean),
          },
        },
      });
      setConnectionTestResult(data?.testAIProviderConnection ?? {
        success: false,
        message: 'The provider test returned no result.',
      });
    } catch (error) {
      setConnectionTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unable to test this connection.',
      });
    }
  };

  const handleTestConnection = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget.form && !event.currentTarget.form.reportValidity()) {
      return;
    }
    void testConnection();
  };

  const isEditMode = Boolean(initialConnection);
  const title = isEditMode ? 'Edit AI connection' : 'Add AI connection';
  const submitButtonLabel = isSaving ? 'Saving...' : isEditMode ? 'Save changes' : 'Add connection';
  const testButtonLabel = isTestingConnection ? 'Testing...' : 'Test connection';
  const hasSelectedProvider = Boolean(selectedProvider);
  const isSubmitDisabled = isSaving || isLoadingProviders || !hasSelectedProvider;
  const isTestingDisabled = isTestingConnection || isLoadingProviders || !hasSelectedProvider;
  const isCredentialRequired = !initialConnection || initialConnection.providerKey !== providerKey;
  const credentialPlaceholder = isEditMode ? 'Enter a new value to rotate this credential' : '';
  const showCatalogWarning = !isLoadingProviders && !providerError && !hasSelectedProvider;
  const hasApiKeyUrl = Boolean(provider.apiKeyUrl);
  const apiKeyButtonTitle = `Open ${provider.name} API key portal in a new tab`;
  const apiKeyButtonAriaLabel = `Get API key for ${provider.name}`;

  return {
    providerKey,
    provider,
    isLoadingProviders,
    providerLoadError: providerError?.message ?? null,
    hasSelectedProvider,
    showCatalogWarning,
    name,
    service,
    baseUrl,
    credentials,
    modelIds,
    isEditMode,
    title,
    submitButtonLabel,
    testButtonLabel,
    isSubmitDisabled,
    isTestingDisabled,
    isCredentialRequired,
    credentialPlaceholder,
    hasApiKeyUrl,
    apiKeyButtonTitle,
    apiKeyButtonAriaLabel,
    connectionTestResult,
    isTestingConnection,
    onProviderChange: handleProviderChange,
    onNameChange: handleNameChange,
    onServiceChange: handleServiceChange,
    onBaseUrlChange: handleBaseUrlChange,
    onModelIdsChange: handleModelIdsChange,
    onCredentialChange: handleCredentialChange,
    onCredentialInputChange: handleCredentialInputChange,
    onGetApiKey: handleGetApiKey,
    onTestConnection: handleTestConnection,
    onSubmit: handleSubmit,
    setName,
    setService,
    setBaseUrl,
    setCredentials,
    setModelIds,
    handleProviderChange,
    handleSubmit,
    testConnection,
  };
};

export default useNewAIForm;

