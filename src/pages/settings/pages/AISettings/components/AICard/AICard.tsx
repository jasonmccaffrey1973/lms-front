import { useId } from 'react';
import type { AICardProps } from './aICard.types';
import { AI_PROVIDERS, SERVICE_LABELS } from '../../aiProviders';
import Button from '../../../../../../sharedComponents/Button/Button';
import StyledAICard from './aICard.styles';
import useAICard from './useAICard';
import SVGIcon from '../../../../../../sharedComponents/SVG/SVGIcon';

const AICard = ({ model, onEdit, onDelete }: AICardProps) => {
  const { isExpanded, toggleExpanded } = useAICard();
  const contentId = `ai-card-${useId()}`;
  const provider = AI_PROVIDERS.find((item) => item.id === model.providerId);

  console.log('provider', provider, model);

  return (
    <StyledAICard data-expanded={isExpanded}>
      <header>
        <Button color="transparent" className="title" onClick={toggleExpanded} aria-expanded={isExpanded} aria-controls={contentId}>
          <span className="chevron-icon" aria-hidden="true">
            <SVGIcon icon="chevronRight" />
          </span>
          <span className="connection">{model.name}<small>{provider?.name ?? model.providerId} &bull; {SERVICE_LABELS[model.service]}</small></span>
        </Button>
        <div className="action-wrapper">
          <span className="status" data-status={model.status}>{model.status.replace('-', ' ')}</span>
          <Button
            color="warning"
            type="button"
            onClick={() => onEdit(model)}
            aria-label={`Edit ${model.name}`}
          >
            <span className="icon-wrapper"><SVGIcon icon="edit" /></span> Edit
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => onDelete(model.id)}
            aria-label={`Delete ${model.name}`}
          >
            <span className="icon-wrapper"><SVGIcon icon="trash" /></span>
            Delete
          </Button>
        </div>
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
