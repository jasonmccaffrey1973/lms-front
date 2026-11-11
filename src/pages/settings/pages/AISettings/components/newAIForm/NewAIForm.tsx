import type { NewAIFormProps } from './newAIForm.types';
import type { AIServiceType } from '../../aISettings.types';
import { AI_PROVIDERS, SERVICE_LABELS } from '../../aiProviders';
import Button from '../../../../../../sharedComponents/Button/Button';
import StyledAIForm from './newAIForm.styles';
import useNewAIForm from './useNewAIForm';

const NewAIForm = ({ initialConnection, onSave, onCancel }: NewAIFormProps) => {
  const {
    providerId,
    provider,
    name,
    setName,
    service,
    setService,
    baseUrl,
    setBaseUrl,
    credentials,
    setCredentials,
    modelIds,
    setModelIds,
    handleProviderChange,
    handleSubmit,
  } = useNewAIForm({ initialConnection, onSave });

  return (
    <StyledAIForm onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{initialConnection ? 'Edit AI connection' : 'Add AI connection'}</h2>
      </div>
      <div className="form-body">
        <div className="fields">
          <label>Provider
            <select value={providerId} onChange={(event) => handleProviderChange(event.target.value)}>
              {AI_PROVIDERS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label>Connection name
            <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Production OpenAI" />
          </label>
          <label>Service
            <select value={service} onChange={(event) => setService(event.target.value as AIServiceType)}>
              {provider.services.map((item) => <option key={item} value={item}>{SERVICE_LABELS[item]}</option>)}
            </select>
          </label>
          <label>API base URL
            <input required type="url" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} placeholder="https://api.example.com/v1" />
          </label>
          {provider.credentialFields.map((field) => (
            <label key={field.key}>{field.label}
              <input
                required={!initialConnection || initialConnection.providerId !== providerId}
                type={field.secret ? 'password' : 'text'}
                autoComplete="new-password"
                value={credentials[field.key] ?? ''}
                onChange={(event) => setCredentials((current) => ({ ...current, [field.key]: event.target.value }))}
                placeholder={initialConnection ? 'Enter a new value to rotate this credential' : ''}
              />
            </label>
          ))}
          <label className="wide">Model IDs <span>(comma separated)</span>
            <input value={modelIds} onChange={(event) => setModelIds(event.target.value)} placeholder="e.g. gpt-4.1, gpt-image-1" />
          </label>
        </div>
      </div>
      <div className="form-footer">
        <p className="note">Credentials are kept in this page's form state only. Saving here is temporary; connect a secured backend before using this in production.</p>
        <div className="actions">
          <Button type="button" color="danger" onClick={onCancel}>Cancel</Button>
          <Button type="submit" color="primary">{initialConnection ? 'Save changes' : 'Add connection'}</Button>
        </div>
      </div>
    </StyledAIForm>
  );
};

export default NewAIForm;

