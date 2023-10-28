import { useState, useEffect, ReactElement } from 'react'
import { Button, Stack, Box, Typography, Divider } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { collectionQuery } from '@queries/collection'
import {
  docTransformJson,
  transformColumns,
  DocumentGridColumns,
  convertStringToHex
} from '@utils/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Permission from '@components/shared/Permission'

export default function DocumentGrid(): ReactElement {
  const router = useRouter()
  const [collectionId, setCollectionId] = useState<string>()
  const [orgId, setOrgId] = useState<string>()
  const [hexOrgId, setHexOrgId] = useState<string>()
  const [hexCollectionId, setHexCollectionId] = useState<string>()
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>({
    id: false,
    retired: false,
    contract: false
  })

  useEffect(() => {
    if (router.isReady && Array.isArray(router.query.id)) {
      setOrgId(router.query.id[0])
      setCollectionId(router.query.id[1])
      setHexOrgId(convertStringToHex(router.query.id[0]))
      setHexCollectionId(convertStringToHex(router.query.id[1]))
    }
  }, [router.query.id])

  const [result] = useQuery({
    query: collectionQuery,
    variables: {
      orgId: hexOrgId,
      collectionId: hexCollectionId
    },
    pause: !hexOrgId || !hexCollectionId
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
    <Box sx={{ width: '100%', padding: 5 }}>
      <Typography variant="h1">
        {data.organisation.organisationName} -{' '}
        {data.organisation.collections[0].collectionName}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Permission scope="publisher">
          <Link href={`/create/document/${orgId}/${collectionId}`}>
            <Button variant="outlined">Create a Document</Button>
          </Link>
        </Permission>
        <Permission scope="admin">
          <Link href={`/edit/collection/${orgId}/${collectionId}`}>
            <Button variant="outlined">Edit this collection</Button>
          </Link>
        </Permission>
      </Stack>
      <br />
      <Divider />
      <Typography variant="h2">Documents within this collection:</Typography>
      <DataGrid
        rows={jsonData}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => {
          setColumnVisibilityModel(newModel)
        }}
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
