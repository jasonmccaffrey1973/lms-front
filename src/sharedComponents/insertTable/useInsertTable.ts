import { useState } from "react";
import type { UpdateTableSize, UseInsertTableProps } from "./InsertTable.types";

const useInsertTable = ({ initialValues, onInsert }: UseInsertTableProps) => {
    const [rows, setRows] = useState(initialValues.rows);
    const [columns, setColumns] = useState(initialValues.columns);

    const update = ({ rows: newRows, columns: newColumns }: UpdateTableSize) => {
        setRows(newRows);
        setColumns(newColumns);
        onInsert(newRows, newColumns);
    };

    return { update, rows, columns };
};

export default useInsertTable;