import { useId } from 'react';
import type { AICardProps } from './aICard.types';
import { AI_PROVIDERS, SERVICE_LABELS } from '../../aiProviders';
import Button from '../../../../../../sharedComponents/Button/Button';
import StyledAICard from './aICard.styles';
import useAICard from './useAICard';

const AICard = ({ model, onEdit, onDelete }: AICardProps) => {
  const { isExpanded, toggleExpanded } = useAICard();
  const contentId = `ai-card-${useId()}`;
  const provider = AI_PROVIDERS.find((item) => item.id === model.providerId);

  return (
    <StyledAICard data-expanded={isExpanded}>
      <header>
        <Button color="transparent" className="title" onClick={toggleExpanded} aria-expanded={isExpanded} aria-controls={contentId}>
          <span><strong>{model.name}</strong><small>{provider?.name ?? model.providerId} · {SERVICE_LABELS[model.service]}</small></span>
        </Button>
        <span className="status" data-status={model.status}>{model.status.replace('-', ' ')}</span>
        <Button className="icon-action" color="transparent" type="button" onClick={() => onEdit(model)} aria-label={`Edit ${model.name}`}>Edit</Button>
        <Button className="icon-action" color="danger" type="button" onClick={() => onDelete(model.id)} aria-label={`Delete ${model.name}`}>Delete</Button>
      </header>
      <div id={contentId} className="content" aria-expanded={isExpanded} aria-hidden={!isExpanded}>
        <dl>
          <div><dt>Base URL</dt><dd>{model.baseUrl || 'Not set'}</dd></div>
          <div><dt>Authentication</dt><dd>{model.authType}</dd></div>
          <div><dt>Credential</dt><dd>{Object.keys(model.credentials).length ? '•••••••• (stored)' : 'Not configured'}</dd></div>
          <div><dt>Models</dt><dd>{model.modelIds.length ? model.modelIds.join(', ') : 'No models configured'}</dd></div>
          {provider?.credentialHeader && <div><dt>Credential header</dt><dd>{provider.credentialHeader}</dd></div>}
        </dl>
      </div>
    </StyledAICard>
  );
};

export default AICard;
