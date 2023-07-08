'use client'

import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { collectionQuery } from './query'
import { transformJson } from '@utils/transforCollectionData'

export default function CollectionsGrid({
  params
}: {
  params: { organisationId: string }
}) {
  const [result] = useQuery({
    query: collectionQuery,
    variables: { orgId: params.organisationId }
  })

  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'collectionName',
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
    },
    {
      field: data.collections[0].collectionInfoFields[0],
      headerName: data.collections[0].collectionInfoFields[0],
      width: 150
    }
  ]
  console.log('data.collections', data.collections)
  const jsonData = transformJson(data.collections)
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={jsonData}
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
