import { useState, useEffect, ReactElement } from 'react'
import { documentQuery } from '@queries/document'
import datatypes from '@constants/datatypes.json'
import {
  useAltBaseDocumentUpdateFee as updateFee,
  usePrepareAltBasePublishOrUpdateDocument as preparePublishDoc
} from '@hooks/generated'
import { Box, TextField, Typography, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import Form from '@components/Form/Form'
import { convertStringToHex, increaseProgress } from '@utils/index'

export default function EditDocument(): ReactElement {
  const router = useRouter()
  const [progress, setProgress] = useState<number>(0)
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [dataTypes, setDataTypes] = useState<string[]>([])
  const [fieldValues, setFieldValues] = useState<string[]>([])
  const [collectionId, setCollectionId] = useState<string>()
  const [orgId, setOrgId] = useState<string>()
  const [documentId, setDocumentId] = useState<string>()
  const [hexDocumentId, setHexDocumentId] = useState<string>()
  const [hexOrgId, setHexOrgId] = useState<string>()
  const [hexCollectionId, setHexCollectionId] = useState<string>()
  const fee = updateFee().data

  useEffect(() => {
    if (router.isReady && Array.isArray(router.query.id)) {
      setOrgId(router.query.id[0])
      setCollectionId(router.query.id[1])
      setDocumentId(router.query.id[2])
      setHexOrgId(convertStringToHex(router.query.id[0]))
      setHexCollectionId(convertStringToHex(router.query.id[1]))
      setHexDocumentId(convertStringToHex(router.query.id[2]))
    }
  }, [router.query.id])

  const [result] = useQuery({
    query: documentQuery,
    variables: {
      orgId: hexOrgId,
      collectionId: hexCollectionId,
      documentId: hexDocumentId
    },
    pause: !hexOrgId || !hexCollectionId || !hexDocumentId
  })

  const { data: queryData, fetching, error: queryError } = result

  useEffect(() => {
    if (queryData) {
      setFieldNames(queryData?.organisation?.collections?.[0]?.fieldNames ?? [])
      setDataTypes(
        queryData?.organisation?.collections?.[0]?.fieldDataTypes ?? []
      )
      setFieldValues(
        queryData?.organisation?.collections?.[0]?.documents?.[0]
          ?.fieldValues ?? []
      )
    }
  }, [queryData])

  const { config } = preparePublishDoc({
    args: [
      documentId,
      orgId,
      collectionId,
      fieldNames,
      dataTypes,
      fieldValues,
      true,
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
        If this is a new document you will need to wait a few minutes before it
        is visible...
      </p>
    )

  if (!fetching)
    return (
      <Form
        progress={progress}
        successPath={`/document/${orgId}/${collectionId}/${documentId}}`}
        config={config}
      >
        <Box sx={{ m: 2 }}>
          <Typography variant="h2">Edit this document</Typography>

          {fieldNames.map((fieldName, i) => (
            <TextField
              required
              key={i} // Add a key for list items
              id={fieldName}
              label={fieldName}
              defaultValue={fieldValues[i]}
              type={datatypes[Number(dataTypes?.[i])]?.type}
              onChange={(e) => {
                const currentFieldValues = Array.isArray(fieldValues)
                  ? fieldValues
                  : []
                const updatedFieldValues = [...currentFieldValues]
                updatedFieldValues[i] = String(e.target.value)
                setFieldValues(updatedFieldValues)
              }}
              onBlur={() => {
                setProgress(increaseProgress(progress, fieldNames.length))
              }}
              sx={{ mr: 2, mb: 2 }}
            />
          ))}
        </Box>
      </Form>
    )
}
