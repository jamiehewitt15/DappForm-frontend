import { useState, useEffect, ReactElement } from 'react'
import { Box, Typography, Divider, CircularProgress } from '@mui/material'
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { convertStringToHex } from '@utils/index'
import Breadcrumb from '@components/Navigation/Breadcrumb'
import { documentsQuery } from '@src/queries/v1/documents'
import { useFormContext } from '@context/FormContext'
import { useRouter } from 'next/router'
import Header from '@components/ResponseForm/ResponseFormHeading'

export default function DocumentGrid(): ReactElement {
  const router = useRouter()
  const { orgId, setCollectionId } = useFormContext()
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>({
    id: false,
    retired: false,
    contract: false
  })

  const [result] = useQuery({
    query: documentsQuery,
    variables: { collectionId: convertStringToHex(router.query.id) },
    pause: !router.query.id
  })

  useEffect(() => {
    if (router.isReady && typeof router?.query?.id === 'string') {
      const id = parseInt(router.query.id, 10)
      id > 0 && setCollectionId(id)
    }
  })
  const { data, fetching, error } = result

  if (fetching)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        padding="20%"
      >
        <CircularProgress />
      </Box>
    )
  if (error) return <p>Oh no... {error.message}</p>
  if (error) return <p>Oh no... {error.message}</p>
  if (!data)
    return (
      <p>
        If this is a new collection you will need to wait a few minutes before
        it is visible...
      </p>
    )

  const columns: GridColDef[] = data.collection.fields.map((field) => ({
    field: field.fieldName,
    headerName: field.fieldName,
    flex: 1
  }))

  const rows = data.collection.documents.map((doc) => {
    const row: any = { id: doc.id }

    doc.fieldNames.forEach((fieldName: string, index: number) => {
      row[fieldName] = doc.fieldValues[index] || ''
    })

    return row
  })

  return (
    <Box sx={{ width: '100%', padding: 5 }}>
      <Header showRequiredMessage={false}>
        <>
          <br />
          <Divider />
          <Typography variant="h2">Responses:</Typography>
          <DataGrid
            rows={rows}
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
        </>
      </Header>
    </Box>
  )
}
