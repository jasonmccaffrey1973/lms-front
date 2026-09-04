type InsertTableProps = {
  initialRows?: number;
  initialColumns?: number;
  maxRows?: number;
  maxColumns?: number;
  onInsert: (rows: number, columns: number) => void;
};

type UseInsertTableProps = {
  initialValues: { rows: number; columns: number };
  maxLimits: { maxRows: number; maxColumns: number };
  onInsert: (rows: number, columns: number) => void;
};

type UpdateTableSize = {
  rows: number;
  columns: number;
};

export type { InsertTableProps, UseInsertTableProps, UpdateTableSize };