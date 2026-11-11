import { useCallback, useState } from 'react';
import type { AIConnection, AIConnectionInput, AISettingsHookValue } from './aISettings.types';

const useAISettings = (): AISettingsHookValue => {
  const [connections, setConnections] = useState<AIConnection[]>([]);
  const [editingConnection, setEditingConnection] = useState<AIConnection | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const closeForm = useCallback(() => {
    setEditingConnection(undefined);
    setIsFormOpen(false);
  }, []);

  const saveConnection = useCallback((input: AIConnectionInput) => {
    if (editingConnection) {
      setConnections((items) => items.map((item) => item.id === editingConnection.id
        ? {
          ...item,
          ...input,
          credentials: Object.keys(input.credentials).length
            ? input.credentials
            : (input.providerId === item.providerId ? item.credentials : {}),
          status: 'not-tested',
        }
        : item));
    } else {
      setConnections((items) => [...items, { ...input, id: crypto.randomUUID(), status: 'not-tested' }]);
    }
    closeForm();
  }, [closeForm, editingConnection]);

  const startNewConnection = useCallback(() => {
    setEditingConnection(undefined);
    setIsFormOpen(true);
  }, []);

  const editConnection = useCallback((connection: AIConnection) => {
    setEditingConnection(connection);
    setIsFormOpen(true);
  }, []);

  const deleteConnection = useCallback((id: string) => {
    setConnections((items) => items.filter((item) => item.id !== id));
  }, []);

  return {
    connections,
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
