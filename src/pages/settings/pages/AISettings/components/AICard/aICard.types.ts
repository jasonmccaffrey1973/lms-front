import type { AIConnection } from '../../aISettings.types';
import type { SaveConnectionHandler } from '../../aISettings.types';

export interface AICardProps {
  model: AIConnection;
  onSave: SaveConnectionHandler;
  onDelete: (id: string) => void;
  isSaving?: boolean;
  saveError?: string | null;
}
