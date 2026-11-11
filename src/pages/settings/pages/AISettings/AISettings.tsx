import type { AISettingsHookValue } from './aISettings.types';
import ExistingAI from './components/existingAI/ExistingAI';
import { StyledSettingsPageWrapper } from '../../settings.styles';

type AISettingsProps = Pick<AISettingsHookValue, 'connections' | 'editConnection' | 'deleteConnection'>;

const AISettings = ({ connections, editConnection, deleteConnection }: AISettingsProps) => (
  <StyledSettingsPageWrapper>
    <div className="ai-settings-heading">
      <div><h1>AI connections</h1><p>Configure provider credentials and the services your LMS can use.</p></div>
    </div>
    <ExistingAI connections={connections} onEdit={editConnection} onDelete={deleteConnection} />
  </StyledSettingsPageWrapper>
);

export default AISettings;
