import { useState, useEffect, ReactElement } from 'react'
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Tooltip,
  useTheme
} from '@mui/material'
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid'
import { useQuery } from 'urql'
import { convertStringToHex } from '@utils/index'
import { documentsQuery } from '@src/queries/v1/documents'
import { useFormContext } from '@context/FormContext'
import { useRouter } from 'next/router'
import Header from '@components/ResponseForm/ResponseFormHeading'

const calculateColumnWidth = (headerName: string, fontSize = 16) => {
  const context = document.createElement('canvas').getContext('2d')
  context.font = `${fontSize}px Arial`
  const textWidth = context.measureText(headerName).width
  const padding = 100 // Adding padding for better spacing
  const minWidth = 100 // Minimum width
  const twoLineWidth = textWidth / 2 + padding
  return Math.max(twoLineWidth, minWidth)
}

export default function DocumentGrid(): ReactElement {
  const theme = useTheme()
  const router = useRouter()
  const { setCollectionId } = useFormContext()
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>({
    id: false,
    retired: false,
    contract: false,
    blockTimestamp: false,
    owner: false,
    blockNumber: false,
    transactionHash: false
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
  }, [router.isReady, router.query.id, setCollectionId])

  const { data, fetching, error } = result

  if (fetching || !data)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        padding="20%"
        sx={{
          [theme.breakpoints.down('sm')]: {
            padding: '10%'
          }
        }}
      >
        <CircularProgress />
      </Box>
    )
  if (error) return <p>Oh no... {error.message}</p>

  const columns: GridColDef[] = [
    ...data?.collection?.fields?.map((field) => ({
      field: field.fieldName,
      headerName: field.fieldName,
      flex: 1,
      minWidth: calculateColumnWidth(field.fieldName),
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value}</span>
        </Tooltip>
      )
    })),
    {
      field: 'blockTimestamp',
      headerName: 'Block Timestamp',
      flex: 1,
      minWidth: calculateColumnWidth('Block Timestamp'),
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1,
      minWidth: calculateColumnWidth('Owner'),
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'blockNumber',
      headerName: 'Block Number',
      flex: 1,
      minWidth: calculateColumnWidth('Block Number'),
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'transactionHash',
      headerName: 'Transaction Hash',
      flex: 1,
      minWidth: calculateColumnWidth('Transaction Hash'),
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    {
      field: 'transactionFrom',
      headerName: 'From Account',
      flex: 1,
      minWidth: calculateColumnWidth('Transaction From'),
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value}</span>
        </Tooltip>
      )
    }
  ]

  const rows = data?.collection?.documents?.map((doc) => {
    const row: any = {
      id: doc.id,
      blockTimestamp: doc.blockTimestamp,
      owner: doc.owner,
      blockNumber: doc.blockNumber,
      transactionHash: doc.transactionHash,
      transactionFrom: doc.transactionFrom
    }

    doc.fieldNames.forEach((fieldName: string, index: number) => {
      row[fieldName] = doc.fieldValues[index] || ''
    })

    return row
  })

  return (
    <Box
      sx={{
        width: '100%',
        padding: 5,
        [theme.breakpoints.down('sm')]: {
          padding: 2
        }
      }}
    >
      <Header showRequiredMessage={false}>
        <>
          <br />
          <Divider />
          <Typography variant="h2">Responses:</Typography>
          <Box
            sx={{
              height: 400,
              width: '100%',
              mt: 2,
              overflowX: 'auto',
              [theme.breakpoints.down('sm')]: {
                mt: 1
              }
            }}
          >
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
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '12px'
                  }
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  textOverflow: 'clip',
                  whiteSpace: 'break-spaces',
                  lineHeight: '1.5rem'
                },
                '& .MuiDataGrid-row': {
                  borderBottom: '1px solid #e0e0e0'
                },
                '& .MuiDataGrid-cell': {
                  borderRight: '1px solid #e0e0e0',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '12px',
                    padding: '8px'
                  }
                },
                '& .MuiDataGrid-cell:last-of-type': {
                  borderRight: 'none'
                },
                '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader': {
                  borderRight: '1px solid #e0e0e0'
                },
                '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader:last-of-type':
                  {
                    borderRight: 'none'
                  }
              }}
              getRowHeight={() => 'auto'}
            />
          </Box>
        </>
      </Header>
    </Box>
  )
}
