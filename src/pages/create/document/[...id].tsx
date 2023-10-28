import { useState, useEffect, ReactElement } from 'react'
import { collectionQuery } from '@queries/createDocument'
import datatypes from '@constants/datatypes.json'
import {
  useDecentraDbDocCreationFee,
  usePrepareDecentraDbPublishOrUpdateDocument as preparePublishDoc,
  useDecentraDbDocumentCreatedOrUpdatedEvent as documentCreated
} from '@hooks/generated'
import { Box, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import Form from '@components/Form/Form'
import { convertStringToHex, increaseProgress } from '@utils/index'

export default function PublishDocument(): ReactElement {
  const router = useRouter()
  const [progress, setProgress] = useState<number>(0)
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [dataTypes, setDataTypes] = useState<string[]>([])
  const [fieldValues, setFieldValues] = useState<string[]>([])
  const [collectionId, setCollectionId] = useState<string>()
  const [collectionName, setCollectionName] = useState<string>('')
  const [orgId, setOrgId] = useState<string>()
  const [documentId, setDocumentId] = useState<number>()
  const [hexOrgId, setHexOrgId] = useState<string>()
  const [hexCollectionId, setHexCollectionId] = useState<string>()
  const fee = useDecentraDbDocCreationFee().data

  documentCreated({
    listener: (logs) => {
      setDocumentId(Number(logs[0].args.documentId))
    }
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

  if (fetching) return <p>Loading...</p>
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
        progress={progress}
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
              onBlur={() => {
                setProgress(increaseProgress(progress, fieldNames.length))
              }}
              sx={{ mr: 4, mb: 2 }}
            />
          ))}
        </Box>
      </Form>
    )
}
