import type { NewAIFormProps } from './newAIForm.types';
import { AI_PROVIDERS, SERVICE_LABELS } from '../../aiProviders';
import Button from '../../../../../../sharedComponents/Button/Button';
import SVGIcon from '../../../../../../sharedComponents/SVG/SVGIcon';
import Render from '../../../../../../sharedComponents/Render';
import StyledAIForm from './newAIForm.styles';
import useNewAIForm from './useNewAIForm';

const NewAIForm = ({ initialConnection, onSave, onCancel, isSaving = false, saveError }: NewAIFormProps) => {
  const {
    providerKey,
    provider,
    name,
    service,
    baseUrl,
    credentials,
    modelIds,
    isLoadingProviders,
    providerLoadError,
    showCatalogWarning,
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
    onCredentialInputChange,
    onModelIdsChange,
    onGetApiKey,
    onTestConnection,
    onSubmit,
  } = useNewAIForm({ initialConnection, onSave, isSaving });

  return (
    <StyledAIForm onSubmit={onSubmit}>
      <div className="form-header">
        <h2>{title}</h2>
      </div>
      <div className="form-body">
        <div className="fields">
          <label>Provider
            <select value={providerKey} onChange={onProviderChange} disabled={isLoadingProviders}>
              {AI_PROVIDERS.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </label>
          <label>Connection name
            <input required value={name} onChange={onNameChange} placeholder="e.g. Production OpenAI" />
          </label>
          <label>Service
            <select value={service} onChange={onServiceChange}>
              {provider.services.map((item) => (
                <option key={item} value={item}>{SERVICE_LABELS[item]}</option>
              ))}
            </select>
          </label>
          <label>API base URL
            <input required type="url" value={baseUrl} onChange={onBaseUrlChange} placeholder="https://api.example.com/v1" />
          </label>
          {provider.credentialFields.map((field, index) => (
            <label key={field.key}>
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
                required={isCredentialRequired}
                type={field.secret ? 'password' : 'text'}
                autoComplete="new-password"
                value={credentials[field.key] ?? ''}
                onChange={onCredentialInputChange(field.key)}
                placeholder={credentialPlaceholder}
              />
            </label>
          ))}
          <label className="wide">Model IDs <span>(comma separated)</span>
            <input required value={modelIds} onChange={onModelIdsChange} placeholder="e.g. gpt-4.1, gpt-image-1" />
          </label>
        </div>
        <Render if={isLoadingProviders}>
          <p role="status">Loading providers...</p>
        </Render>
        <Render if={Boolean(providerLoadError)}>
          <p role="alert">Unable to load providers: {providerLoadError}</p>
        </Render>
        <Render if={showCatalogWarning}>
          <p role="alert">This provider is not available in the backend provider catalog.</p>
        </Render>
      </div>
      <div className="form-footer">
        <div className="connection-test">
          <Button
            type="button"
            color="secondary"
            disabled={isTestingDisabled}
            onClick={onTestConnection}
          >
            {testButtonLabel}
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
          <Button type="submit" color="primary" disabled={isSubmitDisabled}>{submitButtonLabel}</Button>
        </div>
      </div>
    </StyledAIForm>
  );
};

export default NewAIForm;

