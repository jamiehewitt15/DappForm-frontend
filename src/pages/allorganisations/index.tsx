import { Box, Button, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { orgQuery } from '@queries/organisations'
import Link from 'next/link'
import Permission from '@components/shared/Permission'

export default function DataGridDemo() {
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
      width: 350
    },
    {
      field: 'View',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        const orgId = parseInt(params.row.id as string, 16)

        return (
          <Stack direction="row" spacing={2}>
            <Link href={`/organisation/${orgId}`}>
              <Button variant="outlined">View</Button>
            </Link>
            <Permission scope="admin" paramOrgId={String(orgId)}>
              <Link href={`/edit/organisation/${orgId}`}>
                <Button variant="outlined">Edit</Button>
              </Link>
            </Permission>
          </Stack>
        )
      }
    }
  ]

  const [result] = useQuery({
    query: orgQuery
  })

  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Box sx={{ width: '100%', padding: 5 }}>
      <Typography variant="h1">All organisations</Typography>
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
              pageSize: 10
            }
          }
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
