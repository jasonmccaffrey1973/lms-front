import { StyledInsertTableWrapper } from "./InsertTable.styles";
import type { InsertTableProps } from "./InsertTable.types";
import useInsertTable from "./useInsertTable";

const InsertTable = ({
  initialRows = 5,
  initialColumns = 5,
  maxRows = 15,
  maxColumns = 15,
  onInsert,
}: InsertTableProps) => {
  const {
    gridRows,
    gridCols,
    hoveredRows,
    hoveredCols,
    manualRows,
    manualCols,
    setManualRows,
    setManualCols,
    updateHover,
    clearHover,
    selectCell,
    insertTable,
  } = useInsertTable({
    initialValues: { rows: initialRows, columns: initialColumns },
    maxLimits: { maxRows, maxColumns },
    onInsert,
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertTable(manualRows, manualCols);
  };

  return (
    <StyledInsertTableWrapper>
      {/* Visual Header */}
      <div className="insert-table-header">
        {hoveredRows > 0 && hoveredCols > 0
          ? `${hoveredCols} x ${hoveredRows} Table`
          : "Insert Table"}
      </div>

      {/* Dynamic Hover Grid */}
      <div className="insert-table-grid" onMouseLeave={clearHover}>
        {Array.from({ length: gridRows }).map((_, rowIndex) => {
          const rowNum = rowIndex + 1;
          return (
            <div key={rowIndex} className="insert-table-row">
              {Array.from({ length: gridCols }).map((_, colIndex) => {
                const colNum = colIndex + 1;
                const isHighlighted =
                  rowNum <= hoveredRows && colNum <= hoveredCols;

                return (
                  <div
                    key={colIndex}
                    className={`insert-table-cell ${
                      isHighlighted ? "highlighted" : ""
                    }`}
                    onMouseEnter={() =>
                      updateHover({ rows: rowNum, columns: colNum })
                    }
                    onClick={() => selectCell(rowNum, colNum)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <hr className="insert-table-divider" />

      {/* Manual Input Controls */}
      <div className="insert-table-manual">
        <span className="manual-title">Custom Size</span>
        <form onSubmit={handleManualSubmit}>
          <label className="input-group">
            Cols
            <input
              type="number"
              min={1}
              max={maxColumns}
              value={manualCols}
              onChange={(e) =>
                setManualCols(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
          </label>

          <label className="input-group">
            Rows
            <input
              type="number"
              min={1}
              max={maxRows}
              value={manualRows}
              onChange={(e) =>
                setManualRows(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
          </label>

          <button type="submit">Insert</button>
        </form>
      </div>
    </StyledInsertTableWrapper>
  );
};

export default InsertTable;