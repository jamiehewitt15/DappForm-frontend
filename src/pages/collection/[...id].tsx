import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { documentQuery } from '../../../queries/collection'
import {
  docTransformJson,
  transformColumns,
  DocumentGridColumns
} from '@utils/transformDocumentData'

export default function DocumentGrid({
  params
}: {
  params: { organisationId: string; collectionId: string }
}) {
  const [result] = useQuery({
    query: documentQuery,
    variables: {
      orgId: params.organisationId,
      collectionId: params.collectionId
    }
  })

  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  if (!data)
    return (
      <p>
        If this is a new collection you will need to wait a few minutes before
        it is visible...
      </p>
    )
  console.log('data', data)

  const initialColumns: DocumentGridColumns[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'retired', headerName: 'retired', width: 150 },
    { field: 'contract', headerName: 'Contract', width: 150 }
  ]

  const columns = transformColumns(
    initialColumns,
    data.organisation.collections[0].fieldNames
  )
  const jsonData = docTransformJson(data.organisation.collections[0].documents)

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h1>
        {data.organisation.organisationName} -{' '}
        {data.organisation.collections[0].collectionName}
      </h1>
      <h2>Documents within this collection:</h2>
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
