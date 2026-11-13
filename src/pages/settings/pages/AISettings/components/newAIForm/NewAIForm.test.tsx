import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AI_PROVIDERS } from '../../aiProviders';

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

describe('NewAIForm - Presentation and Logic Separation', () => {
  beforeEach(() => {
    mockedUseQuery.mockReturnValue({
      data: {
        aiProviders: [
          { id: '1', key: 'openai', name: 'OpenAI', is_enabled: true },
          { id: '2', key: 'runway', name: 'Runway', is_enabled: true },
          { id: '3', key: 'kling', name: 'Kling', is_enabled: true },
          { id: '4', key: 'elevenlabs', name: 'ElevenLabs', is_enabled: true },
          { id: '5', key: 'custom', name: 'Custom provider', is_enabled: true },
        ],
      },
      loading: false,
      error: undefined,
    });
    mockedUseMutation.mockReturnValue([vi.fn(), { loading: false }]);
  });

  describe('AI Providers configuration', () => {
    it('defines valid apiKeyUrl for OpenAI, Runway, Kling, and ElevenLabs', () => {
      const openai = AI_PROVIDERS.find((p) => p.id === 'openai');
      const runway = AI_PROVIDERS.find((p) => p.id === 'runway');
      const kling = AI_PROVIDERS.find((p) => p.id === 'kling');
      const elevenlabs = AI_PROVIDERS.find((p) => p.id === 'elevenlabs');
      const custom = AI_PROVIDERS.find((p) => p.id === 'custom');

      expect(openai?.apiKeyUrl).toBe('https://platform.openai.com/api-keys');
      expect(runway?.apiKeyUrl).toBe('https://dev.runwayml.com');
      expect(kling?.apiKeyUrl).toBe('https://klingai.com/dev/api-key');
      expect(elevenlabs?.apiKeyUrl).toBe('https://elevenlabs.io/app/settings/api-keys');
      expect(custom?.apiKeyUrl).toBeUndefined();
    });
  });

  describe('useNewAIForm hook separation of concerns', () => {
    const renderHookHarness = (props: Parameters<typeof useNewAIForm>[0]) => {
      let result!: UseNewAIFormReturn;
      const Harness = () => {
        result = useNewAIForm(props);
        return null;
      };
      renderToStaticMarkup(<Harness />);
      return result;
    };

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

    it('does not render the Get API key button when the provider has no apiKeyUrl (Custom)', () => {
      const customConnection: AIConnection = {
        id: 'conn-1',
        providerId: '5',
        providerKey: 'custom',
        name: 'My Custom Provider',
        service: 'text',
        baseUrl: 'https://my-custom-provider.example.com',
        authType: 'bearer',
        credentials: { token: 'secret' },
        modelIds: ['custom-model-1'],
        status: 'connected',
      };

      const html = renderToStaticMarkup(
        <NewAIForm
          initialConnection={customConnection}
          onSave={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      expect(html).not.toContain('Get API key');
      expect(html).not.toContain('get-api-key-btn');
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
});

