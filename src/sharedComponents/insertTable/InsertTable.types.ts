type InsertTableProps = {
    rows: number;
    columns: number;
    onInsert: (rows: number, columns: number) => void;
};

type UseInsertTableProps = {
    initialValues: { rows: number; columns: number };
    onInsert: (rows: number, columns: number) => void;
};

type UpdateTableSize = {
    rows: number;
    columns: number;
};
    
export type { InsertTableProps, UseInsertTableProps, UpdateTableSize };