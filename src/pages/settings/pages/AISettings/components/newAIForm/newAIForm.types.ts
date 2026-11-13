import type { AIConnection, AIConnectionInput, AIServiceType } from '../../aISettings.types';
import type { AI_PROVIDERS } from '../../aiProviders';

export interface NewAIFormProps {
  initialConnection?: AIConnection;
  onSave: (connection: AIConnectionInput) => void | Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
  saveError?: string | null;
}

export interface UseNewAIFormOptions extends Pick<NewAIFormProps, 'initialConnection' | 'onSave'> {
  isSaving?: boolean;
}

export interface UseNewAIFormReturn {
  providerKey: string;
  provider: typeof AI_PROVIDERS[0];
  isLoadingProviders: boolean;
  providerLoadError: string | null;
  hasSelectedProvider: boolean;
  showCatalogWarning: boolean;
  name: string;
  service: AIServiceType;
  baseUrl: string;
  credentials: Record<string, string>;
  modelIds: string;
  isEditMode: boolean;
  title: string;
  submitButtonLabel: string;
  testButtonLabel: string;
  isSubmitDisabled: boolean;
  isTestingDisabled: boolean;
  isCredentialRequired: boolean;
  credentialPlaceholder: string;
  hasApiKeyUrl: boolean;
  apiKeyButtonTitle: string;
  apiKeyButtonAriaLabel: string;
  connectionTestResult: { success: boolean; message: string } | null;
  isTestingConnection: boolean;
  onProviderChange: (event: React.ChangeEvent<HTMLSelectElement> | string) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onServiceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBaseUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onModelIdsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCredentialChange: (key: string, value: string) => void;
  onCredentialInputChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGetApiKey: (event?: React.MouseEvent) => void;
  onTestConnection: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setName: (value: string) => void;
  setService: (value: AIServiceType) => void;
  setBaseUrl: (value: string) => void;
  setCredentials: (updater: (current: Record<string, string>) => Record<string, string>) => void;
  setModelIds: (value: string) => void;
  handleProviderChange: (nextProviderId: string | React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  testConnection: () => Promise<void>;
}

