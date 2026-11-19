import type { NewAIFormProps } from './newAIForm.types';
import type { AIAuthType, AIServiceType } from '../../aISettings.types';
import Button from '../../../../../../sharedComponents/Button/Button';
import SVGIcon from '../../../../../../sharedComponents/SVG/SVGIcon';
import Render from '../../../../../../sharedComponents/Render';
import StyledAIForm from './newAIForm.styles';
import useNewAIForm from './useNewAIForm';
import useProviderEditor from './useProviderEditor';
import buildAIConnectionFormFields from '../AIForm/buildAIConnectionFormFields';

const AI_SERVICE_OPTIONS: AIServiceType[] = ['text', 'image', 'video', 'voice', 'music'];
const NewAIForm = ({ initialConnection, onSave, onCancel, isSaving = false, saveError }: NewAIFormProps) => {
  const {
    providerKey,
    provider,
    providerOptions,
    name,
    service,
    baseUrl,
    credentials,
    modelIds,
    isLoadingProviders,
    providerLoadError,
    showCatalogWarning,
    catalogWarningMessage,
    isCreatingProvider,
    providerCreateError,
    title,
    submitButtonLabel,
    testButtonLabel,
    isSubmitDisabled,
    isTestingDisabled,
    isCredentialRequired,
    credentialPlaceholder,
    connectionTestResult,
    hasApiKeyUrl,
    apiKeyButtonTitle,
    apiKeyButtonAriaLabel,
    onProviderChange,
    onNameChange,
    onServiceChange,
    onBaseUrlChange,
    onCredentialChange,
    onCredentialInputChange,
    onModelIdsChange,
    onGetApiKey,
    onTestConnection,
    onSubmit,
    onCreateProvider,
    setName,
    setService,
    setBaseUrl,
    setModelIds,
  } = useNewAIForm({ initialConnection, onSave, isSaving });
  const {
    isProviderEditorOpen,
    providerDraft,
    providerDraftError,
    toggleProviderEditor,
    updateProviderDraft,
    toggleServiceSelection,
    handleCreateProvider,
  } = useProviderEditor({ onCreateProvider });
  const fields = buildAIConnectionFormFields({
    providerKey,
    providerOptions,
    onProviderChange: (value) => onProviderChange(value),
    name,
    onNameChange: setName,
    service,
    serviceOptions: provider?.services ?? ['text'],
    onServiceChange: setService,
    baseUrl,
    onBaseUrlChange: setBaseUrl,
    credentialFields: provider?.credentialFields ?? [],
    credentials,
    credentialPlaceholder,
    isCredentialRequired,
    onCredentialChange,
    modelIds,
    onModelIdsChange: setModelIds,
    disabled: false,
  });

  return (
    <StyledAIForm onSubmit={onSubmit}>
      <div className="form-header">
        <h2>{title}</h2>
      </div>
      <div className="form-body">
        <div className="fields">
          <label>Provider
            <select value={providerKey} onChange={onProviderChange} disabled={isLoadingProviders}>
              {fields.providerField.options?.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>Connection name
            <input
              required={fields.nameField.required}
              value={fields.nameField.value}
              onChange={onNameChange}
              placeholder={fields.nameField.placeholder}
            />
          </label>
          <label>Service
            <select value={service} onChange={onServiceChange}>
              {fields.serviceField.options?.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>API base URL
            <input
              required={fields.baseUrlField.required}
              type="url"
              value={fields.baseUrlField.value}
              onChange={onBaseUrlChange}
              placeholder={fields.baseUrlField.placeholder}
            />
          </label>
          {fields.credentialFields.map((field, index) => (
            <label key={field.name}>
              <div className="credential-label-row">
                <span className="credential-label-title">{field.label}</span>
                <Render if={index === 0 && hasApiKeyUrl}>
                  <Button
                    type="button"
                    color="success"
                    className="get-api-key-btn"
                    title={apiKeyButtonTitle}
                    aria-label={apiKeyButtonAriaLabel}
                    onClick={onGetApiKey}
                  >
                    <SVGIcon icon="link" />
                    Get API key
                  </Button>
                </Render>
              </div>
              <input
                required={field.required}
                type={field.type}
                autoComplete="new-password"
                value={field.value}
                onChange={onCredentialInputChange(field.name)}
                placeholder={field.placeholder}
              />
            </label>
          ))}
          <label className="wide">Model IDs <span>(comma separated)</span>
            <input
              required={fields.modelIdsField.required}
              value={fields.modelIdsField.value}
              onChange={onModelIdsChange}
              placeholder={fields.modelIdsField.placeholder}
            />
          </label>
        </div>
        <Render if={isLoadingProviders}>
          <p role="status">Loading providers...</p>
        </Render>
        <Render if={Boolean(providerLoadError)}>
          <p role="alert">Unable to load providers: {providerLoadError}</p>
        </Render>
        <Render if={showCatalogWarning}>
          <p role="alert">{catalogWarningMessage}</p>
        </Render>
        <div className="provider-editor">
          <Render if={isProviderEditorOpen}>
            <div className="provider-editor-fields">
              <label>Provider key
                <input
                  value={providerDraft.key}
                  onChange={(event) => updateProviderDraft('key', event.target.value)}
                  placeholder="e.g. anthropic"
                />
              </label>
              <label>Provider name
                <input
                  value={providerDraft.name}
                  onChange={(event) => updateProviderDraft('name', event.target.value)}
                  placeholder="e.g. Anthropic Claude"
                />
              </label>
              <label className="service-chip-group">Services
                <div className="service-chip-list" role="group" aria-label="Provider services">
                  {AI_SERVICE_OPTIONS.map((serviceOption) => (
                    <button
                      key={serviceOption}
                      type="button"
                      className="service-chip"
                      data-selected={providerDraft.services.includes(serviceOption)}
                      onClick={() => toggleServiceSelection(serviceOption)}
                    >
                      {serviceOption}
                    </button>
                  ))}
                </div>
              </label>
              <label>Default base URL
                <input
                  type="url"
                  value={providerDraft.defaultBaseUrl}
                  onChange={(event) => updateProviderDraft('defaultBaseUrl', event.target.value)}
                  placeholder="https://api.example.com/v1"
                />
              </label>
              <label>Auth type
                <select
                  value={providerDraft.authType}
                  onChange={(event) => updateProviderDraft('authType', event.target.value as AIAuthType)}
                >
                  <option value="api-key">api-key</option>
                  <option value="bearer">bearer</option>
                  <option value="basic">basic</option>
                  <option value="access-secret">access-secret</option>
                  <option value="none">none</option>
                </select>
              </label>
              <label>Credential field key
                <input
                  value={providerDraft.credentialFieldKey}
                  onChange={(event) => updateProviderDraft('credentialFieldKey', event.target.value)}
                  placeholder="e.g. apiKey"
                />
              </label>
              <label>Credential field label
                <input
                  value={providerDraft.credentialFieldLabel}
                  onChange={(event) => updateProviderDraft('credentialFieldLabel', event.target.value)}
                  placeholder="e.g. API key"
                />
              </label>
              <label>Credential header
                <input
                  value={providerDraft.credentialHeader}
                  onChange={(event) => updateProviderDraft('credentialHeader', event.target.value)}
                  placeholder="e.g. x-api-key"
                />
              </label>
              <label>API key URL
                <input
                  type="url"
                  value={providerDraft.apiKeyUrl}
                  onChange={(event) => updateProviderDraft('apiKeyUrl', event.target.value)}
                  placeholder="https://console.example.com/api-keys"
                />
              </label>
              <label className="provider-editor-checkbox">
                <input
                  type="checkbox"
                  checked={providerDraft.credentialFieldSecret}
                  onChange={(event) => updateProviderDraft('credentialFieldSecret', event.target.checked)}
                />
                Credential field is secret
              </label>
              <div className="provider-editor-actions">
                <Button type="button" color="success" onClick={handleCreateProvider} disabled={isCreatingProvider}>
                  {isCreatingProvider ? 'Creating provider...' : 'Create provider'}
                </Button>
              </div>
              <Render if={Boolean(providerCreateError)}>
                <p role="alert" className="save-error">{providerCreateError}</p>
              </Render>
              <Render if={Boolean(providerDraftError)}>
                <p role="alert" className="save-error">{providerDraftError}</p>
              </Render>
            </div>
          </Render>
        </div>
      </div>
      <div className="form-footer">
        <div className="connection-test">
          <Button
            type="button"
            color="info"
            disabled={isTestingDisabled}
            onClick={onTestConnection}
          >
            {testButtonLabel}
          </Button>
          <Button
            type="button"
            color={isProviderEditorOpen ? 'danger' : 'success'}
            onClick={toggleProviderEditor}
            disabled={isCreatingProvider}
          >
            {isProviderEditorOpen ? 'Close provider editor' : 'Add provider'}
          </Button>
          <Render if={Boolean(connectionTestResult)}>
            <p role={connectionTestResult?.success ? 'status' : 'alert'} data-success={connectionTestResult?.success}>
              {connectionTestResult?.message}
            </p>
          </Render>
        </div>
        <Render if={Boolean(saveError)}>
          <p role="alert" className="save-error">{saveError}</p>
        </Render>
        <div className="actions">
          <Button type="button" color="danger" onClick={onCancel}>Cancel</Button>
          <Button type="submit" color="success" disabled={isSubmitDisabled}>{submitButtonLabel}</Button>
        </div>
      </div>
    </StyledAIForm>
  );
};

export default NewAIForm;

