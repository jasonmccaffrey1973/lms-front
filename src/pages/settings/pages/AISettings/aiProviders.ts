import type { AIProviderDefinition } from './aISettings.types';

export const AI_PROVIDERS: AIProviderDefinition[] = [
  {
    id: 'openai', name: 'OpenAI', services: ['text', 'image', 'voice'],
    defaultBaseUrl: 'https://api.openai.com/v1', authType: 'api-key',
    credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }], credentialHeader: 'Authorization: Bearer',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'runway', name: 'Runway', services: ['image', 'video'],
    defaultBaseUrl: 'https://api.dev.runwayml.com', authType: 'api-key',
    credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }], credentialHeader: 'Authorization: Bearer',
    apiKeyUrl: 'https://dev.runwayml.com',
  },
  {
    id: 'kling', name: 'Kling', services: ['image', 'video'],
    defaultBaseUrl: 'https://api.klingai.com', authType: 'access-secret',
    credentialFields: [
      { key: 'accessKey', label: 'Access key', secret: true },
      { key: 'secretKey', label: 'Secret key', secret: true },
    ],
    apiKeyUrl: 'https://klingai.com/dev/api-key',
  },
  {
    id: 'elevenlabs', name: 'ElevenLabs', services: ['voice', 'music'],
    defaultBaseUrl: 'https://api.elevenlabs.io/v1', authType: 'api-key',
    credentialFields: [{ key: 'apiKey', label: 'API key', secret: true }], credentialHeader: 'xi-api-key',
    apiKeyUrl: 'https://elevenlabs.io/app/settings/api-keys',
  },
  {
    id: 'custom', name: 'Custom provider', services: ['text', 'image', 'video', 'voice', 'music'],
    defaultBaseUrl: '', authType: 'bearer',
    credentialFields: [{ key: 'token', label: 'Bearer token', secret: true }],
  },
];

export const SERVICE_LABELS = {
  text: 'Text', image: 'Image', video: 'Video', voice: 'Voice', music: 'Music',
} as const;
