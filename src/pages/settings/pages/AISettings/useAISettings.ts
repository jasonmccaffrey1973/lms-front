import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import type { AIConnection, AIConnectionInput, AISettingsHookValue } from './aISettings.types';
import {
  AI_PROVIDER_CONNECTIONS_GQL,
  CREATE_AI_PROVIDER_CONNECTION_GQL,
  DELETE_AI_PROVIDER_CONNECTION_GQL,
  UPDATE_AI_PROVIDER_CONNECTION_GQL,
} from '../../../../queries/aiProviderConnectionQueries';

const getErrorMessage = (error: unknown) => error instanceof Error ? error.message : 'The request failed.';

const useAISettings = (): AISettingsHookValue => {
  const [editingConnection, setEditingConnection] = useState<AIConnection | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);
  const { data, loading: isLoading, error: queryError } = useQuery(AI_PROVIDER_CONNECTIONS_GQL, {
    fetchPolicy: 'cache-and-network',
  });
  const [createConnection, { loading: isCreating }] = useMutation(CREATE_AI_PROVIDER_CONNECTION_GQL);
  const [updateConnection, { loading: isUpdating }] = useMutation(UPDATE_AI_PROVIDER_CONNECTION_GQL);
  const [removeConnection] = useMutation(DELETE_AI_PROVIDER_CONNECTION_GQL);

  const connections: AIConnection[] = (data?.aiProviderConnections ?? []).map((record) => ({
    ...record,
    providerKey: record.provider.key,
    credentials: {},
  }));

  const closeForm = useCallback(() => {
    setEditingConnection(undefined);
    setIsFormOpen(false);
    setOperationError(null);
  }, []);

  const saveConnection = useCallback(async (input: AIConnectionInput) => {
    setOperationError(null);
    const credentials = Object.entries(input.credentials).map(([key, value]) => ({ key, value }));
    const baseInput = {
      providerId: input.providerId,
      name: input.name,
      service: input.service,
      baseUrl: input.baseUrl,
      authType: input.authType,
      modelIds: input.modelIds,
    };

    try {
      if (editingConnection) {
        await updateConnection({
          variables: {
            id: editingConnection.id,
            input: { ...baseInput, ...(credentials.length ? { credentials } : {}) },
          },
          refetchQueries: [{ query: AI_PROVIDER_CONNECTIONS_GQL }],
          awaitRefetchQueries: true,
        });
      } else {
        await createConnection({
          variables: { input: { ...baseInput, credentials } },
          refetchQueries: [{ query: AI_PROVIDER_CONNECTIONS_GQL }],
          awaitRefetchQueries: true,
        });
      }
      closeForm();
    } catch (error) {
      setOperationError(getErrorMessage(error));
    }
  }, [closeForm, createConnection, editingConnection, updateConnection]);

  const startNewConnection = useCallback(() => {
    setOperationError(null);
    setEditingConnection(undefined);
    setIsFormOpen(true);
  }, []);

  const editConnection = useCallback((connection: AIConnection) => {
    setOperationError(null);
    setEditingConnection(connection);
    setIsFormOpen(true);
  }, []);

  const deleteConnection = useCallback(async (id: string) => {
    setOperationError(null);
    try {
      const { data: result } = await removeConnection({
        variables: { id },
        refetchQueries: [{ query: AI_PROVIDER_CONNECTIONS_GQL }],
        awaitRefetchQueries: true,
      });
      if (!result?.deleteAIProviderConnection) setOperationError('The connection was not deleted.');
    } catch (error) {
      setOperationError(getErrorMessage(error));
    }
  }, [removeConnection]);

  return {
    connections,
    isLoading,
    loadError: queryError?.message ?? null,
    operationError,
    isSaving: isCreating || isUpdating,
    isFormOpen,
    editingConnection,
    startNewConnection,
    editConnection,
    saveConnection,
    closeForm,
    deleteConnection,
  };
};

export default useAISettings;
