import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockedUseQuery, mockedUseMutation } = vi.hoisted(() => ({
  mockedUseQuery: vi.fn(),
  mockedUseMutation: vi.fn(),
}));

vi.mock('@apollo/client/react', () => ({
  useQuery: mockedUseQuery,
  useMutation: mockedUseMutation,
}));

import NewAIForm from './NewAIForm';
import useNewAIForm from './useNewAIForm';
import type { UseNewAIFormReturn } from './newAIForm.types';
import type { AIConnection } from '../../aISettings.types';

const providerCatalogFixture = [
  {
    id: '1',
    key: 'openai',
    name: 'OpenAI',
    services: ['text', 'image', 'voice'],
    defaultBaseUrl: 'https://api.openai.com/v1',
    authType: 'api-key',
    credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }],
    credentialHeader: 'Authorization: Bearer',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: '2',
    key: 'internal',
    name: 'Internal Gateway',
    services: ['text', 'image'],
    defaultBaseUrl: 'https://internal.example.com/v1',
    authType: 'bearer',
    credentialFields: [{ key: 'token', label: 'Bearer token', secret: true }],
    credentialHeader: null,
    apiKeyUrl: null,
  },
];

describe('NewAIForm - Presentation and Logic Separation', () => {
  beforeEach(() => {
    mockedUseQuery.mockReturnValue({
      data: { aiProviders: providerCatalogFixture },
      loading: false,
      error: undefined,
    });
    mockedUseMutation.mockReturnValue([vi.fn(), { loading: false }]);
  });

  describe('AI Providers catalog usage', () => {
    it('maps provider options from backend catalog', () => {
      const result = renderHookHarness({ onSave: vi.fn() });

      expect(result.providerOptions).toEqual([
        { value: 'openai', label: 'OpenAI' },
        { value: 'internal', label: 'Internal Gateway' },
      ]);
    });
  });

  describe('useNewAIForm hook separation of concerns', () => {
    it('computes create-mode presentation states correctly', () => {
      const result = renderHookHarness({ onSave: vi.fn() });

      expect(result.isEditMode).toBe(false);
      expect(result.title).toBe('Add AI connection');
      expect(result.submitButtonLabel).toBe('Add connection');
      expect(result.testButtonLabel).toBe('Test connection');
      expect(result.isSubmitDisabled).toBe(false);
      expect(result.isCredentialRequired).toBe(true);
      expect(result.credentialPlaceholder).toBe('');
      expect(result.hasApiKeyUrl).toBe(true);
      expect(result.apiKeyButtonTitle).toBe('Open OpenAI API key portal in a new tab');
    });

    it('computes edit-mode and saving presentation states correctly', () => {
      const existingConnection: AIConnection = {
        id: 'conn-1',
        providerId: '1',
        providerKey: 'openai',
        name: 'Existing OpenAI',
        service: 'text',
        baseUrl: 'https://api.openai.com/v1',
        authType: 'api-key',
        credentials: {},
        modelIds: ['gpt-4'],
        status: 'connected',
      };

      const result = renderHookHarness({
        initialConnection: existingConnection,
        onSave: vi.fn(),
        isSaving: true,
      });

      expect(result.isEditMode).toBe(true);
      expect(result.title).toBe('Edit AI connection');
      expect(result.submitButtonLabel).toBe('Saving...');
      expect(result.isSubmitDisabled).toBe(true);
      expect(result.isCredentialRequired).toBe(false);
      expect(result.credentialPlaceholder).toBe('Enter a new value to rotate this credential');
    });

    it('handles onGetApiKey click by opening provider URL in new window', () => {
      const openMock = vi.fn();
      vi.stubGlobal('window', { open: openMock });

      try {
        const result = renderHookHarness({ onSave: vi.fn() });
        const stopPropagation = vi.fn();
        const preventDefault = vi.fn();

        result.onGetApiKey({ stopPropagation, preventDefault } as unknown as React.MouseEvent);

        expect(stopPropagation).toHaveBeenCalledOnce();
        expect(preventDefault).toHaveBeenCalledOnce();
        expect(openMock).toHaveBeenCalledWith('https://platform.openai.com/api-keys', '_blank', 'noopener,noreferrer');
      } finally {
        vi.unstubAllGlobals();
      }
    });

    it('creates a provider through GraphQL and selects it', async () => {
      const createProvider = vi.fn().mockResolvedValue({
        data: {
          createAiProvider: {
            key: 'anthropic',
          },
        },
      });
      mockedUseMutation
        .mockReturnValueOnce([createProvider, { loading: false }])
        .mockReturnValueOnce([vi.fn(), { loading: false }]);

      const result = renderHookHarness({ onSave: vi.fn() });
      const created = await result.onCreateProvider({
        key: 'anthropic',
        name: 'Anthropic Claude',
        services: ['text'],
        defaultBaseUrl: 'https://api.anthropic.com/v1',
        authType: 'api-key',
        credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }],
        credentialHeader: 'x-api-key',
        apiKeyUrl: 'https://console.anthropic.com/settings/keys',
      });

      expect(created).toBe(true);
      expect(createProvider).toHaveBeenCalledOnce();
    });

    it('surfaces provider creation failures', async () => {
      const createProvider = vi.fn().mockRejectedValue(new Error('Provider key already exists.'));
      mockedUseMutation
        .mockReturnValueOnce([createProvider, { loading: false }])
        .mockReturnValueOnce([vi.fn(), { loading: false }]);

      const result = renderHookHarness({ onSave: vi.fn() });
      const created = await result.onCreateProvider({
        key: 'openai',
        name: 'OpenAI Duplicate',
        services: ['text'],
        defaultBaseUrl: 'https://api.openai.com/v1',
        authType: 'api-key',
        credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }],
      });

      expect(created).toBe(false);
    });
  });

  describe('Form rendering', () => {
    it('renders the Get API key button for providers with apiKeyUrl (default OpenAI)', () => {
      const html = renderToStaticMarkup(
        <NewAIForm onSave={vi.fn()} onCancel={vi.fn()} />
      );

      expect(html).toContain('Get API key');
      expect(html).toContain('title="Open OpenAI API key portal in a new tab"');
      expect(html).toContain('aria-label="Get API key for OpenAI"');
      expect(html).toContain('get-api-key-btn');
    });

    it('does not render the Get API key button when the provider has no apiKeyUrl', () => {
      const internalConnection: AIConnection = {
        id: 'conn-1',
        providerId: '2',
        providerKey: 'internal',
        name: 'Internal Provider',
        service: 'text',
        baseUrl: 'https://internal.example.com/v1',
        authType: 'bearer',
        credentials: { token: 'secret' },
        modelIds: ['internal-model-1'],
        status: 'connected',
      };

      const html = renderToStaticMarkup(
        <NewAIForm
          initialConnection={internalConnection}
          onSave={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      expect(html).not.toContain('Get API key');
      expect(html).not.toContain('get-api-key-btn');
    });

    it('renders migration warning for legacy custom connections missing from catalog', () => {
      const legacyCustomConnection: AIConnection = {
        id: 'conn-legacy',
        providerId: 'legacy-custom-id',
        providerKey: 'custom',
        name: 'Legacy Custom Provider',
        service: 'text',
        baseUrl: 'https://legacy-custom.example.com/v1',
        authType: 'bearer',
        credentials: {},
        modelIds: ['legacy-model'],
        status: 'error',
      };

      const html = renderToStaticMarkup(
        <NewAIForm
          initialConnection={legacyCustomConnection}
          onSave={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      expect(html).toContain('which is no longer in the backend provider catalog');
      expect(html).toContain('Select a replacement provider and save to migrate it');
    });

    it('renders edit mode title and rotating credential placeholder when initialConnection is provided', () => {
      const existingConnection: AIConnection = {
        id: 'conn-1',
        providerId: '1',
        providerKey: 'openai',
        name: 'Production OpenAI',
        service: 'text',
        baseUrl: 'https://api.openai.com/v1',
        authType: 'api-key',
        credentials: {},
        modelIds: ['gpt-4'],
        status: 'connected',
      };

      const html = renderToStaticMarkup(
        <NewAIForm
          initialConnection={existingConnection}
          onSave={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      expect(html).toContain('<h2>Edit AI connection</h2>');
      expect(html).toContain('placeholder="Enter a new value to rotate this credential"');
      expect(html).toContain('Save changes');
    });
  });

  const renderHookHarness = (props: Parameters<typeof useNewAIForm>[0]) => {
    let result!: UseNewAIFormReturn;
    const Harness = () => {
      result = useNewAIForm(props);
      return null;
    };
    renderToStaticMarkup(<Harness />);
    return result;
  };
});

