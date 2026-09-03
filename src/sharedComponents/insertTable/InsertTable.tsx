import { StyledInsertTableWrapper } from "./InsertTable.styles";
import type { InsertTableProps } from "./InsertTable.types";
import useInsertTable from "./useInsertTable";

const InsertTable = ({ rows, columns, onInsert }: InsertTableProps) => {

    const { update } = useInsertTable({ initialValues: { rows, columns }, onInsert });

    return (
        <StyledInsertTableWrapper>
            <div className="insert-table-grid">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="insert-table-row">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className="insert-table-cell"
                                onMouseEnter={() => update({ rows: rowIndex + 1, columns: colIndex + 1 })}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </StyledInsertTableWrapper>
    );
};

export default InsertTable;