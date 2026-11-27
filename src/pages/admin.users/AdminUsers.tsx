import DataGrid from "../../sharedComponents/DataGrid/DataGrid"
import type { UserDataGridRow } from "../../sharedComponents/DataGrid/dataQueries/users.query"
import useAdminUsers from "./useAdminUsers"

const AdminUsers = () => {
  const { fetchPage, fetchFacetOptions, columns, footerActions } = useAdminUsers()
  
  return (
    <DataGrid<UserDataGridRow>
      title="Users"
      initialData={[]}
      fetchPage={fetchPage}
      fetchFacetOptions={fetchFacetOptions}
      filterableFields={["name", "email"]}
      columns={columns}
      selectionMode="multiple"
      enableColumnVisibilityToggle
      footerActions={footerActions}
    />
  )
}

export default AdminUsers
