import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { orgQuery } from '../../queries/organisations'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'organisationName',
    headerName: 'Name',
    width: 150
  },
  {
    field: 'retired',
    headerName: 'retired',
    width: 150
  },
  {
    field: 'contract',
    headerName: 'Contract',
    description: 'This column has a value getter and is not sortable.',
    width: 160
  }
]

export default function DataGridDemo() {
  const [result] = useQuery({
    query: orgQuery
  })

  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h1>All organisations</h1>
      <DataGrid
        rows={data.organisations}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}
