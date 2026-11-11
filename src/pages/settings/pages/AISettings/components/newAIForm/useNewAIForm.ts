import { useState } from 'react';
import type { AIServiceType } from '../../aISettings.types';
import { AI_PROVIDERS } from '../../aiProviders';
import type { NewAIFormProps, UseNewAIFormReturn } from './newAIForm.types';

const useNewAIForm = ({ initialConnection, onSave }: Pick<NewAIFormProps, 'initialConnection' | 'onSave'>): UseNewAIFormReturn => {
  const [providerId, setProviderId] = useState(initialConnection?.providerId ?? AI_PROVIDERS[0].id);
  const provider = AI_PROVIDERS.find((item) => item.id === providerId) ?? AI_PROVIDERS[0];
  const [name, setName] = useState(initialConnection?.name ?? '');
  const [service, setService] = useState<AIServiceType>(initialConnection?.service ?? provider.services[0]);
  const [baseUrl, setBaseUrl] = useState(initialConnection?.baseUrl ?? provider.defaultBaseUrl);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [modelIds, setModelIds] = useState(initialConnection?.modelIds.join(', ') ?? '');

  const handleProviderChange = (nextProviderId: string) => {
    const nextProvider = AI_PROVIDERS.find((item) => item.id === nextProviderId) ?? AI_PROVIDERS[0];
    setProviderId(nextProviderId);
    setService(nextProvider.services[0]);
    setBaseUrl(nextProvider.defaultBaseUrl);
    setCredentials({});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      providerId,
      name: name.trim(),
      service,
      baseUrl: baseUrl.trim(),
      authType: provider.authType,
      credentials,
      modelIds: modelIds.split(',').map((item) => item.trim()).filter(Boolean),
    });
  };

  return {
    providerId,
    provider,
    name,
    setName,
    service,
    setService,
    baseUrl,
    setBaseUrl,
    credentials,
    setCredentials,
    modelIds,
    setModelIds,
    handleProviderChange,
    handleSubmit,
  };
};

export default useNewAIForm;

