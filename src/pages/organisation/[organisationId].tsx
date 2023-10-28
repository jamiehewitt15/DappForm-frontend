import { useState, useEffect } from 'react'
import { Box, Typography, Stack, Button, Divider } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { collectionQuery } from '@queries/createCollection'
import { collectionTransformJson, convertStringToHex } from '@utils/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Permission from '@components/shared/Permission'

export default function CollectionsGrid() {
  const router = useRouter()
  const [orgId, setOrgId] = useState<string>()

  useEffect(() => {
    if (router.isReady && router.query.organisationId) {
      const hexOrgId = convertStringToHex(router.query.organisationId)
      setOrgId(hexOrgId)
    }
  }, [router.query.organisationId])

  const [result] = useQuery({
    query: collectionQuery,
    variables: { orgId: orgId }
  })

  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  if (!data)
    return (
      <p>
        If this is a new organisation you will need to wait a few minutes before
        it is visible...
      </p>
    )

  const columns: GridColDef[] = [
    {
      field: 'collectionName',
      headerName: 'Name',
      width: 150
    },
    {
      field: data?.organisation?.collections?.[0]?.collectionInfoFields?.[0],
      headerName:
        data?.organisation?.collections?.[0]?.collectionInfoFields?.[0],
      width: 350
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const collectionId = parseInt(params.row.id as string, 16)
        return (
          <Stack direction="row" spacing={2}>
            <Link
              href={`/collection/${router.query.organisationId}/${collectionId}`}
            >
              <Button variant="outlined">View</Button>
            </Link>
            <Permission scope="admin">
              <Link
                href={`/collection/${router.query.organisationId}/${collectionId}`}
              >
                <Button variant="outlined">Edit</Button>
              </Link>
            </Permission>
          </Stack>
        )
      }
    }
  ]

  const jsonData = collectionTransformJson(data?.organisation?.collections)
  return (
    <Box sx={{ width: '100%', padding: 5 }}>
      <Typography variant="h1">
        {data?.organisation?.organisationName}
      </Typography>
      <Permission scope="admin">
        <Stack direction="row" spacing={2}>
          <Link href={`/createcollection/${router.query.organisationId}`}>
            <Button variant="outlined">Create a new collection</Button>
          </Link>
          <Link href={`/edit/organisation/${router.query.organisationId}`}>
            <Button variant="outlined">Edit this organisation</Button>
          </Link>
        </Stack>
        <br />
        <Divider />
      </Permission>
      <Typography variant="h2">
        Collections belonging to this organisation:
      </Typography>
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
