import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import type { AIProviderDefinition, AIServiceType } from '../../aISettings.types';
import type { UseNewAIFormOptions, UseNewAIFormReturn } from './newAIForm.types';
import { AI_PROVIDERS_GQL, CREATE_AI_PROVIDER_GQL, TEST_AI_PROVIDER_CONNECTION_GQL } from '../../../../../../queries/aiProviderConnectionQueries';

const useNewAIForm = ({ initialConnection, onSave, isSaving = false }: UseNewAIFormOptions): UseNewAIFormReturn => {
  const [providerKey, setProviderKey] = useState(initialConnection?.providerKey ?? '');
  const { data: providerData, loading: isLoadingProviders, error: providerError } = useQuery(AI_PROVIDERS_GQL, {
    fetchPolicy: 'cache-and-network',
  });
  const providerCatalog = useMemo<AIProviderDefinition[]>(
    () => (providerData?.aiProviders ?? [])
      .filter((item) => item.is_enabled !== false)
      .map((item) => ({
        id: item.id,
        key: item.key,
        name: item.name,
        services: item.services,
        defaultBaseUrl: item.defaultBaseUrl,
        authType: item.authType,
        credentialFields: item.credentialFields,
        credentialHeader: item.credentialHeader,
        apiKeyUrl: item.apiKeyUrl ?? undefined,
        isEnabled: item.is_enabled !== false,
      })),
    [providerData?.aiProviders],
  );
  const effectiveProviderKey = providerKey || providerCatalog[0]?.key || '';
  const selectedProvider = providerCatalog.find((item) => item.key === effectiveProviderKey);
  const provider = selectedProvider ?? providerCatalog[0];
  const providerOptions = providerCatalog.map((item) => ({ value: item.key, label: item.name }));
  const [name, setName] = useState(initialConnection?.name ?? '');
  const [service, setService] = useState<AIServiceType>(initialConnection?.service ?? 'text');
  const [baseUrl, setBaseUrl] = useState(initialConnection?.baseUrl ?? '');
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [modelIds, setModelIds] = useState(initialConnection?.modelIds.join(', ') ?? '');
  const [connectionTestResult, setConnectionTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [providerCreateError, setProviderCreateError] = useState<string | null>(null);
  const [createAiProvider, { loading: isCreatingProvider }] = useMutation(CREATE_AI_PROVIDER_GQL);
  const [testAIProviderConnection, { loading: isTestingConnection }] = useMutation(TEST_AI_PROVIDER_CONNECTION_GQL);

  function handleProviderChange(nextProviderKeyOrEvent: string | React.ChangeEvent<HTMLSelectElement>) {
    const nextKey = typeof nextProviderKeyOrEvent === 'string' ? nextProviderKeyOrEvent : nextProviderKeyOrEvent.target.value;
    const nextProvider = providerCatalog.find((item) => item.key === nextKey);
    setProviderKey(nextKey);
    if (nextProvider) {
      setService(nextProvider.services[0] ?? 'text');
      setBaseUrl(nextProvider.defaultBaseUrl);
    }
    setCredentials({});
  }

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
    if (typeof window !== 'undefined' && selectedProvider?.apiKeyUrl) {
      window.open(selectedProvider.apiKeyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCreateProvider = async (input: Parameters<UseNewAIFormReturn['onCreateProvider']>[0]) => {
    setProviderCreateError(null);
    try {
      const { data } = await createAiProvider({
        variables: { input },
        refetchQueries: [{ query: AI_PROVIDERS_GQL }],
        awaitRefetchQueries: true,
      });
      if (data?.createAiProvider?.key) {
        handleProviderChange(data.createAiProvider.key);
      }
      return true;
    } catch (error) {
      setProviderCreateError(error instanceof Error ? error.message : 'Unable to create provider.');
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProvider) return false;
    const result = await onSave({
      providerId: selectedProvider.id,
      name: name.trim(),
      service,
      baseUrl: baseUrl.trim(),
      authType: selectedProvider.authType,
      credentials,
      modelIds: modelIds.split(',').map((item) => item.trim()).filter(Boolean),
    });
    return result !== false;
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
            authType: selectedProvider.authType,
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
  const isSubmitDisabled = isSaving || isLoadingProviders || isCreatingProvider || !hasSelectedProvider;
  const isTestingDisabled = isTestingConnection || isLoadingProviders || !hasSelectedProvider;
  const isCredentialRequired = !initialConnection || initialConnection.providerKey !== effectiveProviderKey;
  const credentialPlaceholder = isEditMode ? 'Enter a new value to rotate this credential' : '';
  const showCatalogWarning = !isLoadingProviders && !providerError && providerCatalog.length > 0 && !hasSelectedProvider;
  const hasApiKeyUrl = Boolean(selectedProvider?.apiKeyUrl);
  const apiKeyButtonTitle = selectedProvider ? `Open ${selectedProvider.name} API key portal in a new tab` : 'Get API key';
  const apiKeyButtonAriaLabel = selectedProvider ? `Get API key for ${selectedProvider.name}` : 'Get API key';

  return {
    providerKey: effectiveProviderKey,
    provider,
    providerOptions,
    isLoadingProviders,
    providerLoadError: providerError?.message ?? null,
    hasSelectedProvider,
    showCatalogWarning,
    isCreatingProvider,
    providerCreateError,
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
    onCreateProvider: handleCreateProvider,
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

