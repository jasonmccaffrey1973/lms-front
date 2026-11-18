import { useId } from 'react';
import type { MouseEvent } from 'react';
import type { AICardProps } from './aICard.types';
import { SERVICE_LABELS } from '../../aiProviders';
import Button from '../../../../../../sharedComponents/Button/Button';
import StyledAICard from './aICard.styles';
import useAICard from './useAICard';
import useDeleteConfirm from './useDeleteConfirm';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import SVGIcon from '../../../../../../sharedComponents/SVG/SVGIcon';
import FormElement from '../AIForm/FormElement';

const AICard = ({ model, onSave, onDelete, isSaving = false, saveError }: AICardProps) => {
  const { isExpanded, toggleExpanded, isEditing, editCard, stopEditing, fields, form, handleSubmit } = useAICard({
    model,
    onSave,
    isSaving,
  });
  const { dialogRef, isDialogOpen, openDialog, closeDialog, handleConfirmDelete } = useDeleteConfirm({
    connectionName: model.name,
    onConfirmDelete: () => onDelete(model.id),
  });
  const contentId = `ai-card-${useId()}`;
  const providerName = model.provider?.name ?? model.providerKey ?? model.providerId;
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    editCard();
  };

  return (
    <>
      <StyledAICard data-expanded={isExpanded}>
        <form data-form-mode={isEditing ? 'edit' : 'readonly'} onSubmit={handleSubmit}>
          <header>
            <Button
              color="transparent"
              className="title"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!isEditing) toggleExpanded();
              }}
              aria-expanded={isExpanded}
              aria-controls={contentId}
            >
              <span className="chevron-icon" aria-hidden="true">
                <SVGIcon icon="chevronRight" />
              </span>
              <span className="connection">{model.name}<small>{providerName} &bull; {SERVICE_LABELS[model.service]}</small></span>
            </Button>
            <div className="action-wrapper">
              <span className="status" data-status={model.status}>{model.status.replace('-', ' ')}</span>
              {isEditing ? (
                <Button
                  color="success"
                  type="submit"
                  disabled={form.isSubmitDisabled}
                  aria-label={`Save ${model.name}`}
                >
                  <span className="icon-wrapper"><SVGIcon icon="save" /></span> Save
                </Button>
              ) : (
                <Button
                  color="warning"
                  type="button"
                  onClick={handleEditClick}
                  aria-label={`Edit ${model.name}`}
                >
                  <span className="icon-wrapper"><SVGIcon icon="edit" /></span> Edit
                </Button>
              )}
              <Button
                color="danger"
                type="button"
                onClick={isEditing ? stopEditing : openDialog}
                aria-label={isEditing ? 'Stop Editing' : `Delete ${model.name}`}
              >
                <span className="icon-wrapper"><SVGIcon icon={isEditing ? 'close' : 'trash'} /></span>
                {isEditing ? 'Cancel' : 'Delete'}
              </Button>
            </div>
          </header>
          <div id={contentId} className="content" aria-expanded={isExpanded} aria-hidden={!isExpanded}>
            <div className="card-fields">
              {fields.map((field) => <FormElement key={field.name} field={field} />)}
              {isEditing && saveError && <p role="alert" className="save-error">{saveError}</p>}
            </div>
          </div>
        </form>
      </StyledAICard>
      <DeleteConfirmDialog
        connectionName={model.name}
        dialogRef={dialogRef}
        isDialogOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={closeDialog}
      />
    </>
  );
};

export default AICard;
