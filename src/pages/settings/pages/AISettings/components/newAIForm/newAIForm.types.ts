import type { AIConnection, AIConnectionInput, AIServiceType } from '../../aISettings.types';
import type { AI_PROVIDERS } from '../../aiProviders';

export interface NewAIFormProps {
  initialConnection?: AIConnection;
  onSave: (connection: AIConnectionInput) => void;
  onCancel: () => void;
}

export interface UseNewAIFormReturn {
  providerId: string;
  provider: typeof AI_PROVIDERS[0];
  name: string;
  setName: (value: string) => void;
  service: AIServiceType;
  setService: (value: AIServiceType) => void;
  baseUrl: string;
  setBaseUrl: (value: string) => void;
  credentials: Record<string, string>;
  setCredentials: (updater: (current: Record<string, string>) => Record<string, string>) => void;
  modelIds: string;
  setModelIds: (value: string) => void;
  handleProviderChange: (nextProviderId: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

