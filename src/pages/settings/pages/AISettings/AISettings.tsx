import type { AISettingsPageProps } from './aISettings.types';
import ExistingAI from './components/existingAI/ExistingAI';
import { StyledSettingsPageWrapper } from '../../settings.styles';
import Render from '../../../../sharedComponents/Render';
import EmptyConnections from './components/EmptyConnections/EmptyConnections';

const AISettings = ({ connections, editConnection, deleteConnection, startNewConnection, isLoading, loadError, operationError }: AISettingsPageProps) => (
  <StyledSettingsPageWrapper>
    <div className="ai-settings-heading">
      <h1>AI connections</h1>
      <p>Configure provider credentials and the services your LMS can use.</p>
    </div>
    <div className="ai-settings-body">
      {loadError && <p role="alert">Unable to load AI connections: {loadError}</p>}
      {operationError && <p role="alert">{operationError}</p>}
      <Render if={isLoading && connections.length === 0 && !loadError}>
        <p role="status">Loading AI connections...</p>
      </Render>
      <Render if={connections.length > 0}>
        <ExistingAI connections={connections} onEdit={editConnection} onDelete={deleteConnection} />
      </Render>
      <Render if={!isLoading && !loadError && connections.length === 0}>
        <EmptyConnections onNew={startNewConnection}  />
      </Render>
    </div>
  </StyledSettingsPageWrapper>
);

export default AISettings;
