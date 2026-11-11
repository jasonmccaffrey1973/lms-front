import type { AIConnection } from '../../aISettings.types';
import AICard from '../AICard/AICard';

interface Props {
  connections: AIConnection[];
  onEdit: (connection: AIConnection) => void;
  onDelete: (id: string) => void;
}

const ExistingAI = ({ connections, onEdit, onDelete }: Props) => (
  <section aria-label="Configured AI connections" className="existing-ai">
    {connections.length ? connections.map((connection) => (
      <AICard key={connection.id} model={connection} onEdit={onEdit} onDelete={onDelete} />
    )) : <p>No AI connections configured yet.</p>}
  </section>
);

export default ExistingAI;
