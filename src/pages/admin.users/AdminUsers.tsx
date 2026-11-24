import { useMemo } from "react"
import DataGrid from "../../sharedComponents/DataGrid/DataGrid"
import type { DataGridColumn, DataGridFooterAction } from "../../sharedComponents/DataGrid/dataGrid.types"
import type { UserDataGridRow } from "../../sharedComponents/DataGrid/dataQueries/users.query"
import useAdminUsers from "./useAdminUsers"

const AdminUsers = () => {
  const { fetchPage } = useAdminUsers()
  const columns = useMemo<DataGridColumn<UserDataGridRow>[]>(
    () => [
      { key: "id", header: "ID", visible: false, sortable: false },
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      {
        key: "__typename",
        header: "Role",
        sortable: false,
        render: (row) => row.__typename ?? "",
      },
    ],
    []
  )

  const footerActions = useMemo<DataGridFooterAction<UserDataGridRow>[]>(
    () => [
      {
        id: "impersonate-user",
        label: "Impersonate User",
        isVisible: (selectedRows) => selectedRows.length === 1,
        onClick: (selectedRows) => {
          console.log("Impersonate user", selectedRows[0])
        },
      },
      {
        id: "edit-users",
        label: "Edit",
        isVisible: (selectedRows) => selectedRows.length > 1,
        onClick: (selectedRows) => {
          console.log("Edit users", selectedRows)
        },
      },
      {
        id: "delete-users",
        label: "Delete",
        isVisible: (selectedRows) => selectedRows.length > 1,
        onClick: (selectedRows) => {
          console.log("Delete users", selectedRows)
        },
      },
    ],
    []
  )

  return (
    <DataGrid<UserDataGridRow>
      title="Users"
      initialData={[]}
      fetchPage={fetchPage}
      filterableFields={["name", "email"]}
      columns={columns}
      selectionMode="multiple"
      enableColumnVisibilityToggle
      footerActions={footerActions}
    />
  )
}

export default AdminUsers