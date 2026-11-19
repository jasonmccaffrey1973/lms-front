import type { AIAuthType, AIConnection, AIProviderCredentialField, AIServiceType, SaveConnectionHandler } from '../../aISettings.types';
import type { CreateAIProviderInput } from '../../../../../../queries/aiProviderConnectionQueries';

export interface NewAIFormProps {
  initialConnection?: AIConnection;
  onSave: SaveConnectionHandler;
  onCancel: () => void;
  isSaving?: boolean;
  saveError?: string | null;
}

export interface UseNewAIFormOptions extends Pick<NewAIFormProps, 'initialConnection' | 'onSave'> {
  isSaving?: boolean;
}

export interface ProviderDraft {
  key: string;
  name: string;
  services: AIServiceType[];
  defaultBaseUrl: string;
  authType: AIAuthType;
  credentialFieldKey: string;
  credentialFieldLabel: string;
  credentialFieldSecret: boolean;
  credentialHeader: string;
  apiKeyUrl: string;
}

export interface UseProviderEditorOptions {
  onCreateProvider: (input: CreateAIProviderInput) => Promise<boolean>;
}

export interface UseProviderEditorReturn {
  isProviderEditorOpen: boolean;
  providerDraft: ProviderDraft;
  providerDraftError: string | null;
  toggleProviderEditor: () => void;
  updateProviderDraft: (key: keyof ProviderDraft, value: string | AIAuthType | boolean | AIServiceType[]) => void;
  toggleServiceSelection: (serviceOption: AIServiceType) => void;
  handleCreateProvider: () => Promise<void>;
}

export interface UseNewAIFormReturn {
  providerKey: string;
  provider?: {
    id: string;
    key: string;
    name: string;
    services: AIServiceType[];
    defaultBaseUrl: string;
    authType: AIAuthType;
    credentialFields: AIProviderCredentialField[];
    credentialHeader?: string | null;
    apiKeyUrl?: string;
  };
  providerOptions: Array<{ value: string; label: string }>;
  isLoadingProviders: boolean;
  providerLoadError: string | null;
  hasSelectedProvider: boolean;
  showCatalogWarning: boolean;
  catalogWarningMessage: string;
  isCreatingProvider: boolean;
  providerCreateError: string | null;
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
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  onCreateProvider: (input: CreateAIProviderInput) => Promise<boolean>;
  setName: (value: string) => void;
  setService: (value: AIServiceType) => void;
  setBaseUrl: (value: string) => void;
  setCredentials: (updater: (current: Record<string, string>) => Record<string, string>) => void;
  setModelIds: (value: string) => void;
  handleProviderChange: (nextProviderId: string | React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  testConnection: () => Promise<void>;
}

