import type { RowId, UseDataGridProps } from "./dataGrid.typs"
import { useRef, useState } from "react"

const useDataGrid = <TData,>({ initialData = [] as TData[] }: UseDataGridProps<TData>) => {
const data = useRef<TData[]>(initialData)
const [selectedRows, setSelectedRows] = useState<RowId[]>([]) 
const [serchValue, setSerchValue] = useState<string>("") 

const filterData = () => {
  if (serchValue.length === 0) return data.current
  return data.current.filter((row) =>
    Object.values(row as object).some((value) =>
      String(value).toLowerCase().includes(serchValue.toLowerCase())
    )
  )
}

const clearSelection = () => {
  setSelectedRows([])
}

const isRowSelected = (rowId : RowId) => selectedRows.includes(rowId)

const selectRow = (rowId : RowId) => setSelectedRows((prev) => [...prev, rowId])

const toggleRowSelection = (rowId : RowId) => {
  setSelectedRows((prev) =>
    prev.includes(rowId)
      ? prev.filter((id) => id !== rowId)
      : [...prev, rowId]
  )
}

const clearSearch = () => setSerchValue("") 

const handleSearch = (value: string) => setSerchValue(value) 


return {
  filterData,
  selectRow,
  selectedRows,
  clearSelection,
  isRowSelected,
  toggleRowSelection,
  serchValue,
  clearSearch,
  handleSearch,
}
}

export default useDataGrid