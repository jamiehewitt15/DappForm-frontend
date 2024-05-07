import { useState, useEffect, ReactElement } from 'react'
import { collectionQuery } from '@queries/createDocument'
import datatypes from '@constants/datatypes.json'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBasePublishOrUpdateDocument as preparePublishDoc
} from '@hooks/generated'
import { Box, TextField, Typography, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import Form from '@components/FormElements'
import { convertStringToHex } from '@utils/index'

export default function PublishDocument(): ReactElement {
  const router = useRouter()
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [dataTypes, setDataTypes] = useState<string[]>([])
  const [fieldValues, setFieldValues] = useState<string[]>([])
  const [collectionId, setCollectionId] = useState<string>()
  const [collectionName, setCollectionName] = useState<string>('')
  const [orgId, setOrgId] = useState<string>()
  const [hexOrgId, setHexOrgId] = useState<string>()
  const [hexCollectionId, setHexCollectionId] = useState<string>()
  const fee = getFees().data[2]

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

  const { data: queryData, fetching, error: queryError } = result

  useEffect(() => {
    if (queryData) {
      setFieldNames(queryData?.organisation?.collections?.[0]?.fieldNames ?? [])
      setDataTypes(
        queryData?.organisation?.collections?.[0]?.fieldDataTypes ?? []
      )
      setCollectionName(
        queryData?.organisation?.collections?.[0]?.collectionName ?? ''
      )
    }
  }, [queryData])

  const { config } = preparePublishDoc({
    args: [
      0,
      orgId,
      collectionId,
      fieldNames,
      dataTypes,
      fieldValues,
      false,
      false
    ],
    value: fee
  })

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
  if (queryError) return <p>Oh no... {queryError.message}</p>
  if (!queryData)
    return (
      <p>
        If this is a new organisation you will need to wait a few minutes before
        it is visible...
      </p>
    )

  if (!fetching)
    return (
      <Form
        successPath={`/collection/${orgId}/${collectionId}/}`}
        config={config}
      >
        <Box sx={{ m: 2 }}>
          <Typography variant="h2">
            Create a document in the {collectionName} collection
          </Typography>
          <Typography variant="h3">
            Publish a document in this collection
          </Typography>
          {fieldNames.map((fieldName, i) => (
            <TextField
              required
              key={i} // Add a key for list items
              id={fieldName}
              label={fieldName}
              type={datatypes[Number(dataTypes?.[i])]?.type}
              onChange={(e) => {
                const currentFieldValues = Array.isArray(fieldValues)
                  ? fieldValues
                  : []
                const updatedFieldValues = [...currentFieldValues]
                updatedFieldValues[i] = String(e.target.value)
                setFieldValues(updatedFieldValues)
              }}
              sx={{ mr: 2, mb: 2 }}
            />
          ))}
        </Box>
      </Form>
    )
}
