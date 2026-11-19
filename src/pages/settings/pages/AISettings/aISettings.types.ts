export type AIServiceType = 'text' | 'image' | 'video' | 'voice' | 'music';
export type AIAuthType = 'api-key' | 'bearer' | 'basic' | 'access-secret' | 'none';

export interface AIProviderCredentialField {
  key: string;
  label: string;
  secret?: boolean;
}

export interface AIProviderDefinition {
  id: string;
  key: string;
  name: string;
  services: AIServiceType[];
  defaultBaseUrl: string;
  authType: AIAuthType;
  credentialFields: AIProviderCredentialField[];
  credentialHeader?: string | null;
  apiKeyUrl?: string;
}

export interface AIConnection {
  id: string;
  providerId: string;
  providerKey?: string;
  name: string;
  service: AIServiceType;
  baseUrl: string;
  authType: AIAuthType;
  credentials: Record<string, string>;
  hasCredentials?: boolean;
  credentialKeys?: string[];
  modelIds: string[];
  status: 'not-tested' | 'connected' | 'error';
  provider?: {
    id: string;
    key: string;
    name: string;
  };
}

export type AIConnectionInput = Omit<AIConnection, 'id' | 'status'>;
export type SaveConnectionResult = boolean | void | Promise<boolean | void>;
export type SaveConnectionHandler = (connection: AIConnectionInput, id?: string) => SaveConnectionResult;

export interface AISettingsPageProps {
  connections: AIConnection[];
  isFormOpen: boolean;
  isLoading: boolean;
  isSaving: boolean;
  loadError: string | null;
  operationError: string | null;
  startNewConnection: () => void;
  saveConnection: SaveConnectionHandler;
  deleteConnection: (id: string) => void;
}

export interface AISettingsHookValue {
  connections: AIConnection[];
  isLoading: boolean;
  loadError: string | null;
  operationError: string | null;
  isSaving: boolean;
  isFormOpen: boolean;
  editingConnection?: AIConnection;
  startNewConnection: () => void;
  editConnection: (connection: AIConnection) => void;
  saveConnection: SaveConnectionHandler;
  closeForm: () => void;
  deleteConnection: (id: string) => void | Promise<void>;
}
