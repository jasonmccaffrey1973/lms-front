import { describe, expect, it, vi } from 'vitest';
import buildAIConnectionFormFields from './buildAIConnectionFormFields';

describe('buildAIConnectionFormFields', () => {
  it('builds editable fields with required credential rules', () => {
    const fields = buildAIConnectionFormFields({
      providerKey: 'openai',
      providerOptions: [{ value: 'openai', label: 'OpenAI' }],
      onProviderChange: vi.fn(),
      name: 'Prod OpenAI',
      onNameChange: vi.fn(),
      service: 'text',
      serviceOptions: ['text', 'image'],
      onServiceChange: vi.fn(),
      baseUrl: 'https://api.openai.com/v1',
      onBaseUrlChange: vi.fn(),
      credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }],
      credentials: { apiKey: 'abc' },
      credentialPlaceholder: 'Enter a new value to rotate this credential',
      isCredentialRequired: true,
      onCredentialChange: vi.fn(),
      modelIds: 'gpt-4.1',
      onModelIdsChange: vi.fn(),
      disabled: false,
    });

    expect(fields.nameField.required).toBe(true);
    expect(fields.baseUrlField.required).toBe(true);
    expect(fields.modelIdsField.required).toBe(true);
    expect(fields.credentialFields[0].required).toBe(true);
    expect(fields.credentialFields[0].value).toBe('abc');
    expect(fields.credentialFields[0].type).toBe('password');
  });

  it('builds readonly fields with disabled controls and masked credential values', () => {
    const fields = buildAIConnectionFormFields({
      providerKey: 'openai',
      providerOptions: [{ value: 'openai', label: 'OpenAI' }],
      onProviderChange: vi.fn(),
      name: 'Prod OpenAI',
      onNameChange: vi.fn(),
      service: 'text',
      serviceOptions: ['text'],
      onServiceChange: vi.fn(),
      baseUrl: 'https://api.openai.com/v1',
      onBaseUrlChange: vi.fn(),
      credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }],
      credentials: {},
      credentialPlaceholder: 'Enter a new value to rotate this credential',
      isCredentialRequired: true,
      onCredentialChange: vi.fn(),
      hasStoredCredential: () => true,
      modelIds: 'gpt-4.1',
      onModelIdsChange: vi.fn(),
      disabled: true,
    });

    expect(fields.allFields.every((field) => field.disabled)).toBe(true);
    expect(fields.credentialFields[0].required).toBe(false);
    expect(fields.credentialFields[0].value).toBe('••••••••');
  });

  it('builds provider and service options from shared sources', () => {
    const fields = buildAIConnectionFormFields({
      providerKey: 'openai',
      providerOptions: [{ value: 'openai', label: 'OpenAI' }, { value: 'kling', label: 'Kling' }],
      onProviderChange: vi.fn(),
      name: 'Prod OpenAI',
      onNameChange: vi.fn(),
      service: 'text',
      serviceOptions: ['text', 'image'],
      onServiceChange: vi.fn(),
      baseUrl: 'https://api.openai.com/v1',
      onBaseUrlChange: vi.fn(),
      credentialFields: [],
      credentials: {},
      credentialPlaceholder: '',
      isCredentialRequired: false,
      onCredentialChange: vi.fn(),
      modelIds: 'gpt-4.1',
      onModelIdsChange: vi.fn(),
      disabled: false,
    });

    expect(fields.providerField.options).toEqual([
      { value: 'openai', label: 'OpenAI' },
      { value: 'kling', label: 'Kling' },
    ]);
    expect(fields.serviceField.options).toEqual([
      { value: 'text', label: 'Text' },
      { value: 'image', label: 'Image' },
    ]);
  });
});
