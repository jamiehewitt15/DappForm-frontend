import { useState, useEffect, ReactElement } from 'react'
import { BaseError, Log } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Connected from '@components/shared/Connected'
import NotConnected from '@components/shared/NotConnected'
import WrongNetwork from '@components/shared/WrongNetwork'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { collectionQuery } from '@queries/createCollection'
import datatypes from '@constants/datatypes.json'
import { stringify, convertStringToHex } from '@utils/index'
import {
  useDecentraDbDocumentUpdateFee,
  useDecentraDbPublishOrUpdateDocument as publishDocument,
  usePrepareDecentraDbPublishOrUpdateDocument as preparePublishDoc,
  useDecentraDbDocumentCreatedOrUpdatedEvent as documentCreated
} from '@hooks/generated'
import {
  Box,
  TextField,
  Divider,
  Button,
  Paper,
  Container,
  FormControl,
  InputLabel
} from '@mui/material'
import LinearProgressWithLabel from '@components/shared/LinearProgressWithLabel'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'

interface Datatype {
  type: string
  value: number
}

export default function EditDocument(): ReactElement {
  const router = useRouter()
  const [progress, setProgress] = useState<number>(0)
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [dataTypes, setDataTypes] = useState<string[]>([])
  const [fieldValues, setFieldValues] = useState<string[]>([])
  const [collectionLogs, setDocumentLogs] = useState<any[]>([])
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

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  if (fetching) return <p>Loading...</p>
  if (queryError) return <p>Oh no... {queryError.message}</p>

  if (!fetching)
    return (
      <Paper elevation={3}>
        <Container sx={{ p: 2 }}>
          {!isSuccess && (
            <>
              <LinearProgressWithLabel value={progress} />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  write?.()
                }}
              >
                <Box sx={{ m: 2 }}>
                  <h2>{collectionName}</h2>
                  <h3>Publish a document in this collection</h3>
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

                <Box sx={{ mb: 2 }}>
                  <h3>Finally you need to sign a transaction to complete</h3>
                  <NotConnected>
                    <ConnectButton />
                  </NotConnected>

                  <Connected>
                    <WrongNetwork>
                      <Button
                        disabled={!write}
                        type="submit"
                        variant="contained"
                        onSubmit={(e) => {
                          e.preventDefault()
                          write?.()
                        }}
                      >
                        Update
                      </Button>
                    </WrongNetwork>
                  </Connected>
                </Box>
              </form>
            </>
          )}

          {isLoading && <div>Check wallet...</div>}
          {isPending && <div>Transaction pending...</div>}
          {isSuccess && (
            <>
              <h3>Success!</h3>
              <div>Your document has been published!</div>
              <div>
                Event details:{' '}
                <details>{stringify(collectionLogs[0], null, 2)}</details>
                {/* <Button
                type="button"
                variant="contained"
                onClick={() => router.push('/' + orgId)}
              >
                View Organisation
              </Button> */}
              </div>
            </>
          )}
          {isError && <div>{(error as BaseError)?.shortMessage}</div>}
        </Container>
      </Paper>
    )
}
