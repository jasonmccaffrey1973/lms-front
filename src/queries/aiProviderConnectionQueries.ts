import { gql, type TypedDocumentNode } from '@apollo/client';

export type AIProviderService = 'text' | 'image' | 'video' | 'voice' | 'music';
export type AIProviderAuthType = 'api-key' | 'bearer' | 'basic' | 'access-secret' | 'none';
export type AIProviderConnectionStatus = 'not-tested' | 'connected' | 'error';

export interface AIProviderRecord {
  id: string;
  key: string;
  name: string;
  capabilities?: unknown;
  is_enabled: boolean;
}

/** Safe connection fields returned by the API. Secret values are never queried. */
export interface AIProviderConnectionRecord {
  id: string;
  providerId: string;
  name: string;
  service: AIProviderService;
  baseUrl: string;
  authType: AIProviderAuthType;
  modelIds: string[];
  status: AIProviderConnectionStatus;
  hasCredentials: boolean;
  credentialKeys: string[];
  provider: AIProviderRecord;
}

export interface AIProviderCredentialInput {
  key: string;
  value: string;
}

export interface AIProviderConnectionInput {
  providerId: string;
  name: string;
  service: AIProviderService;
  baseUrl: string;
  authType: AIProviderAuthType;
  credentials: AIProviderCredentialInput[];
  modelIds: string[];
}

export type UpdateAIProviderConnectionInput = Partial<AIProviderConnectionInput>;

export interface AIProviderConnectionsQueryData {
  aiProviderConnections: AIProviderConnectionRecord[];
}

export interface AIProvidersQueryData {
  aiProviders: AIProviderRecord[];
}

export interface AIProviderConnectionMutationData {
  createAIProviderConnection: AIProviderConnectionRecord;
}

export interface CreateAIProviderConnectionMutationVariables {
  input: AIProviderConnectionInput;
}

export interface UpdateAIProviderConnectionMutationData {
  updateAIProviderConnection: AIProviderConnectionRecord;
}

export interface UpdateAIProviderConnectionMutationVariables {
  id: string;
  input: UpdateAIProviderConnectionInput;
}

export interface DeleteAIProviderConnectionMutationData {
  deleteAIProviderConnection: boolean;
}

export interface DeleteAIProviderConnectionMutationVariables {
  id: string;
}

export interface TestAIProviderConnectionMutationData {
  testAIProviderConnection: {
    success: boolean;
    message: string;
  };
}

export interface TestAIProviderConnectionMutationVariables {
  /** When provided, the backend can use the saved credential if input.credentials is empty. */
  id?: string;
  input: AIProviderConnectionInput;
}

const AI_PROVIDER_CONNECTION_FIELDS = gql`
  fragment AIProviderConnectionFields on AiProviderConnection {
    id
    providerId
    name
    service
    baseUrl
    authType
    modelIds
    status
    hasCredentials
    credentialKeys
    provider {
      id
      key
      name
      capabilities
      is_enabled
    }
  }
`;

export const AI_PROVIDERS_GQL = gql`
  query AIProviders {
    aiProviders {
      id
      key
      name
      capabilities
      is_enabled
    }
  }
` as TypedDocumentNode<AIProvidersQueryData>;

export const AI_PROVIDER_CONNECTIONS_GQL = gql`
  query AIProviderConnections {
    aiProviderConnections {
      ...AIProviderConnectionFields
    }
  }
  ${AI_PROVIDER_CONNECTION_FIELDS}
` as TypedDocumentNode<AIProviderConnectionsQueryData>;

export const CREATE_AI_PROVIDER_CONNECTION_GQL = gql`
  mutation CreateAIProviderConnection($input: CreateAIProviderConnectionInput!) {
    createAIProviderConnection(input: $input) {
      ...AIProviderConnectionFields
    }
  }
  ${AI_PROVIDER_CONNECTION_FIELDS}
` as TypedDocumentNode<AIProviderConnectionMutationData, CreateAIProviderConnectionMutationVariables>;

export const UPDATE_AI_PROVIDER_CONNECTION_GQL = gql`
  mutation UpdateAIProviderConnection($id: ID!, $input: UpdateAIProviderConnectionInput!) {
    updateAIProviderConnection(id: $id, input: $input) {
      ...AIProviderConnectionFields
    }
  }
  ${AI_PROVIDER_CONNECTION_FIELDS}
` as TypedDocumentNode<UpdateAIProviderConnectionMutationData, UpdateAIProviderConnectionMutationVariables>;

export const DELETE_AI_PROVIDER_CONNECTION_GQL = gql`
  mutation DeleteAIProviderConnection($id: ID!) {
    deleteAIProviderConnection(id: $id)
  }
` as TypedDocumentNode<DeleteAIProviderConnectionMutationData, DeleteAIProviderConnectionMutationVariables>;

export const TEST_AI_PROVIDER_CONNECTION_GQL = gql`
  mutation TestAIProviderConnection($id: ID, $input: TestAIProviderConnectionInput!) {
    testAIProviderConnection(id: $id, input: $input) {
      success
      message
    }
  }
` as TypedDocumentNode<TestAIProviderConnectionMutationData, TestAIProviderConnectionMutationVariables>;
