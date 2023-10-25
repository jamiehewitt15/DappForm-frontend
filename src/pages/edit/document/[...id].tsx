import { useState, useEffect, ReactElement } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Form from '@components/Form/Form'
import { collectionQuery } from '@queries/createCollection'
import datatypes from '@constants/datatypes.json'
import { convertStringToHex } from '@utils/index'
import {
  useDecentraDbDocumentUpdateFee,
  useDecentraDbPublishOrUpdateDocument as publishDocument,
  usePrepareDecentraDbPublishOrUpdateDocument as preparePublishDoc,
  useDecentraDbDocumentCreatedOrUpdatedEvent as documentCreated
} from '@hooks/generated'
import { Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'

export default function EditDocument(): ReactElement {
  const router = useRouter()
  const [progress, setProgress] = useState<number>(0)
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [dataTypes, setDataTypes] = useState<string[]>([])
  const [fieldValues, setFieldValues] = useState<string[]>([])
  const [documentLogs, setDocumentLogs] = useState<any[]>([])
  const [collectionId, setCollectionId] = useState<string>()
  const [collectionName, setCollectionName] = useState<string>('')
  const [orgId, setOrgId] = useState<string>()
  const [documentId, setDocumentId] = useState<string>()
  const [hexOrgId, setHexOrgId] = useState<string>()
  const [hexCollectionId, setHexCollectionId] = useState<string>()
  const [hexDocumentId, setHexDocumentId] = useState<string>()
  const fee = useDecentraDbDocumentUpdateFee().data

  documentCreated({
    listener: (logs) => {
      setDocumentLogs((x) => [...x, ...logs])
    }
  })

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
    query: collectionQuery,
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
      setCollectionName(
        queryData?.organisation?.collections?.[0]?.collectionName ?? ''
      )
      setFieldValues(
        queryData?.organisation?.collections?.[0]?.documents?.[0]
          ?.fieldValues ?? []
      )
      console.log('field Values', fieldValues)
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
  const { write, data, error, isLoading, isError } = publishDocument(config)

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  if (fetching) return <p>Loading...</p>
  if (queryError) return <p>Oh no... {queryError.message}</p>

  if (!fetching)
    return (
      <Form
        isSuccess={isSuccess}
        isLoading={isLoading}
        isPending={isPending}
        isError={isError}
        progress={progress}
        write={write}
        logs={documentLogs}
        successPath={`/document/${orgId}/${collectionId}/${documentId}}`}
        error={error as BaseError}
      >
        <Box sx={{ m: 2 }}>
          <h2>{collectionName}</h2>
          <h3>Edit this document</h3>
          {fieldNames.map((fieldName, i) => (
            <TextField
              required
              key={i} // Add a key for list items
              id={fieldName}
              label={fieldName}
              type={datatypes[Number(dataTypes[i])].type}
              defaultValue={fieldValues[i]}
              onChange={(e) => {
                const currentFieldValues = Array.isArray(fieldValues)
                  ? fieldValues
                  : []
                const updatedFieldValues = [...currentFieldValues]
                updatedFieldValues[i] = String(e.target.value)
                setFieldValues(updatedFieldValues)
              }}
              onBlur={() => {
                progress <= 80 && setProgress(progress + 20)
              }}
              sx={{ mr: 4, mb: 2 }}
            />
          ))}
        </Box>
      </Form>
    )
}
