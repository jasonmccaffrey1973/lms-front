import type { AIConnection } from '../../aISettings.types';

export interface AICardProps {
  model: AIConnection;
  onEdit: (model: AIConnection) => void;
  onDelete: (id: string) => void;
}
