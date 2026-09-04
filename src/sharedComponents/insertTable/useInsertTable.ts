import { useState } from "react";
import type { UpdateTableSize, UseInsertTableProps } from "./InsertTable.types";

const useInsertTable = ({
  initialValues,
  maxLimits,
  onInsert,
}: UseInsertTableProps) => {
  // Dynamic dimensions of the visible grid
  const [gridRows, setGridRows] = useState(initialValues.rows);
  const [gridCols, setGridCols] = useState(initialValues.columns);

  // Hovered selection state
  const [hoveredRows, setHoveredRows] = useState(0);
  const [hoveredCols, setHoveredCols] = useState(0);

  // Manual input form values
  const [manualRows, setManualRows] = useState(3);
  const [manualCols, setManualCols] = useState(3);

  // Lock hover tracking after user clicks a grid cell
  const [isLocked, setIsLocked] = useState(false);

  const updateHover = ({ rows: newRows, columns: newColumns }: UpdateTableSize) => {
    // If user already clicked a cell, ignore subsequent mouse movements
    if (isLocked) return;

    setHoveredRows(newRows);
    setHoveredCols(newColumns);

    // Keep manual inputs in sync with grid hover
    setManualRows(newRows);
    setManualCols(newColumns);

    // Automatically grow rows near bottom edge
    if (newRows >= gridRows && gridRows < maxLimits.maxRows) {
      setGridRows(Math.min(newRows + 1, maxLimits.maxRows));
    }

    // Automatically grow columns near right edge
    if (newColumns >= gridCols && gridCols < maxLimits.maxColumns) {
      setGridCols(Math.min(newColumns + 1, maxLimits.maxColumns));
    }
  };

  const clearHover = () => {
    // Reset locked state on mouse leave so hovering works if they re-enter
    setIsLocked(false);
    setHoveredRows(0);
    setHoveredCols(0);
    setGridRows(initialValues.rows);
    setGridCols(initialValues.columns);
  };

  const selectCell = (r: number, c: number) => {
    // Lock hover updates to freeze the values
    setIsLocked(true);
    setHoveredRows(r);
    setHoveredCols(c);
    setManualRows(r);
    setManualCols(c);
  };

  const insertTable = (r: number, c: number) => {
    if (r > 0 && c > 0) {
      onInsert(r, c);
    }
  };

  return {
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
  };
};

export default useInsertTable;