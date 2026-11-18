import type { AIConnection, SaveConnectionHandler } from '../../aISettings.types';
import AICard from '../AICard/AICard';

interface Props {
  connections: AIConnection[];
  onSave: SaveConnectionHandler;
  onDelete: (id: string) => void;
  isSaving?: boolean;
  saveError?: string | null;
}

const ExistingAI = ({ connections, onSave, onDelete, isSaving, saveError }: Props) => (
  <section aria-label="Configured AI connections" className="existing-ai">
    {connections.length ? connections.map((connection) => (
      <AICard key={connection.id} model={connection} onSave={onSave} onDelete={onDelete} isSaving={isSaving} saveError={saveError} />
    )) : <p>No AI connections configured yet.</p>}
  </section>
);

export default ExistingAI;
