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
}

export interface AIConnection {
  id: string;
  providerId: string;
  name: string;
  service: AIServiceType;
  baseUrl: string;
  authType: AIAuthType;
  credentials: Record<string, string>;
  modelIds: string[];
  status: 'not-tested' | 'connected' | 'error';
}

export type AIConnectionInput = Omit<AIConnection, 'id' | 'status'>;

export interface AISettingsHookValue {
  connections: AIConnection[];
  isFormOpen: boolean;
  editingConnection?: AIConnection;
  startNewConnection: () => void;
  editConnection: (connection: AIConnection) => void;
  saveConnection: (connection: AIConnectionInput) => void;
  closeForm: () => void;
  deleteConnection: (id: string) => void;
}
