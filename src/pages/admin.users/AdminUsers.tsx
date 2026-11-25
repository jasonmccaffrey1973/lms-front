import DataGrid from "../../sharedComponents/DataGrid/DataGrid"
import type { UserDataGridRow } from "../../sharedComponents/DataGrid/dataQueries/users.query"
import useAdminUsers from "./useAdminUsers"

const AdminUsers = () => {
  const { fetchPage, columns, footerActions } = useAdminUsers()
  
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