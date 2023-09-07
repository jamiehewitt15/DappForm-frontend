import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { collectionQuery } from './query'
import { transformJson } from '@utils/transformCollectionData'
import { useRouter } from 'next/router'

function convertStringToHex(str: string): string {
  const num = parseInt(str, 10) // Parse the string to a base-10 integer

  if (isNaN(num)) {
    throw new Error('Invalid input: not a number')
  }
  const hexNum = '0x' + num.toString(16) // Convert the number to its hexadecimal representation
  return hexNum
}

export default function CollectionsGrid() {
  const router = useRouter()
  const queryParam = router.query.organisationId

  let hexOrgId = ''

  if (Array.isArray(queryParam)) {
    console.warn(
      'Received multiple organisationId parameters. Using the first one.'
    )
    hexOrgId = convertStringToHex(queryParam[0])
  } else if (queryParam) {
    hexOrgId = convertStringToHex(queryParam)
  } else {
    console.warn('No organisationId parameter found.')
  }

  console.log('organisationId', router.query.organisationId)
  console.log('hexOrgId', hexOrgId)
  const [result] = useQuery({
    query: collectionQuery,
    variables: { orgId: hexOrgId }
  })

  const { data, fetching, error } = result
  console.log('data', data)

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  if (!data.collections[0])
    return (
      <p>
        If this is a new organisation you will need to wait a few minutes before
        it is visible...
      </p>
    )

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

  const jsonData = transformJson(data.collections)
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h1>{data.organisation.organisationName}</h1>
      <h2>Collections belonging to this organisation:</h2>
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
