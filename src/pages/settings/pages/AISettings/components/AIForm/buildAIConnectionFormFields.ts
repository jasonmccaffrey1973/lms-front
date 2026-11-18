import { SERVICE_LABELS } from '../../aiProviders';
import type { AIServiceType } from '../../aISettings.types';
import type { FormFieldConfig } from './aiForm.types';

interface BuildAIConnectionFormFieldsOptions {
  providerKey: string;
  providerOptions: Array<{ value: string; label: string }>;
  onProviderChange: (value: string) => void;
  name: string;
  onNameChange: (value: string) => void;
  service: AIServiceType;
  serviceOptions: AIServiceType[];
  onServiceChange: (value: AIServiceType) => void;
  baseUrl: string;
  onBaseUrlChange: (value: string) => void;
  credentialFields: Array<{ key: string; label: string; secret?: boolean }>;
  credentials: Record<string, string>;
  credentialPlaceholder: string;
  isCredentialRequired: boolean;
  onCredentialChange: (key: string, value: string) => void;
  hasStoredCredential?: (key: string) => boolean;
  modelIds: string;
  onModelIdsChange: (value: string) => void;
  disabled: boolean;
}

interface AIConnectionFormFields {
  providerField: FormFieldConfig;
  nameField: FormFieldConfig;
  serviceField: FormFieldConfig;
  baseUrlField: FormFieldConfig;
  credentialFields: FormFieldConfig[];
  modelIdsField: FormFieldConfig;
  allFields: FormFieldConfig[];
}

const buildAIConnectionFormFields = ({
  providerKey,
  providerOptions,
  onProviderChange,
  name,
  onNameChange,
  service,
  serviceOptions,
  onServiceChange,
  baseUrl,
  onBaseUrlChange,
  credentialFields,
  credentials,
  credentialPlaceholder,
  isCredentialRequired,
  onCredentialChange,
  hasStoredCredential,
  modelIds,
  onModelIdsChange,
  disabled,
}: BuildAIConnectionFormFieldsOptions): AIConnectionFormFields => {
  const providerField: FormFieldConfig = {
    name: 'provider',
    type: 'select',
    label: 'Provider',
    value: providerKey,
    disabled,
    onChange: onProviderChange,
    options: providerOptions,
  };

  const nameField: FormFieldConfig = {
    name: 'name',
    type: 'text',
    label: 'Connection name',
    value: name,
    placeholder: 'e.g. Production OpenAI',
    required: true,
    disabled,
    onChange: onNameChange,
  };

  const serviceField: FormFieldConfig = {
    name: 'service',
    type: 'select',
    label: 'Service',
    value: service,
    disabled,
    onChange: (value) => onServiceChange(value as AIServiceType),
    options: serviceOptions.map((item) => ({ value: item, label: SERVICE_LABELS[item] })),
  };

  const baseUrlField: FormFieldConfig = {
    name: 'baseUrl',
    type: 'url',
    label: 'API base URL',
    value: baseUrl,
    placeholder: 'https://api.example.com/v1',
    required: true,
    disabled,
    onChange: onBaseUrlChange,
  };

  const credentialFieldConfigs: FormFieldConfig[] = credentialFields.map((field) => {
    const currentValue = credentials[field.key] ?? '';
    const readonlyMaskedValue = hasStoredCredential?.(field.key) ? '••••••••' : '';
    return {
      name: field.key,
      type: field.secret ? 'password' : 'text',
      label: field.label,
      value: disabled ? readonlyMaskedValue : currentValue,
      placeholder: credentialPlaceholder,
      required: !disabled && isCredentialRequired,
      disabled,
      onChange: (value) => onCredentialChange(field.key, value),
    };
  });

  const modelIdsField: FormFieldConfig = {
    name: 'modelIds',
    type: 'text',
    label: 'Model IDs (comma separated)',
    value: modelIds,
    placeholder: 'e.g. gpt-4.1, gpt-image-1',
    required: true,
    disabled,
    onChange: onModelIdsChange,
  };

  const allFields = [
    providerField,
    nameField,
    serviceField,
    baseUrlField,
    ...credentialFieldConfigs,
    modelIdsField,
  ];

  return {
    providerField,
    nameField,
    serviceField,
    baseUrlField,
    credentialFields: credentialFieldConfigs,
    modelIdsField,
    allFields,
  };
};

export default buildAIConnectionFormFields;
