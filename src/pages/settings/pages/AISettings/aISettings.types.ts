export type AIServiceType = 'text' | 'image' | 'video' | 'voice' | 'music';
export type AIAuthType = 'api-key' | 'bearer' | 'basic' | 'access-secret' | 'none';

export interface AIProviderDefinition {
  id: string;
  name: string;
  services: AIServiceType[];
  defaultBaseUrl: string;
  authType: AIAuthType;
  credentialFields: { key: string; label: string; secret?: boolean }[];
  credentialHeader?: string;
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
}

export type AIConnectionInput = Omit<AIConnection, 'id' | 'status'>;

export interface AISettingsPageProps {
  connections: AIConnection[];
  isFormOpen: boolean;
  isLoading: boolean;
  loadError: string | null;
  operationError: string | null;
  startNewConnection: () => void;
  editConnection: (connection: AIConnection) => void;
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
  saveConnection: (connection: AIConnectionInput) => Promise<void>;
  closeForm: () => void;
  deleteConnection: (id: string) => void | Promise<void>;
}
