import { ReactElement, useState, ReactNode, useEffect } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Submit from '@components/Form/Submit'
import { stringify, checkUrlPath } from '@utils/index'
import { Divider, Button, Paper, Container, Typography } from '@mui/material'
import LinearProgressWithLabel from '@components/shared/LinearProgressWithLabel'
import { useRouter } from 'next/router'
import {
  useDecentraDbCreateOrUpdateOrganisation as useOrganisation,
  useDecentraDbOrganisationCreatedOrUpdatedEvent as orgLogs,
  useDecentraDbPublishOrUpdateDocument as useDocument,
  useDecentraDbDocumentCreatedOrUpdatedEvent as documentLogs,
  useDecentraDbCreateOrUpdateCollection as useCollection,
  useDecentraDbCollectionCreatedOrUpdatedEvent as collectionLogs,
  useDecentraDbCreateOrganisationAndCollectionAndAddRoles as useOnboarding
} from '@hooks/generated'

export default function Form({
  children,
  progress,
  successPath,
  config
}: {
  children: ReactNode
  progress: number
  successPath: string
  config: any
}): ReactElement {
  const router = useRouter()
  const [logs, setLogs] = useState<any[]>([])
  const [pathReady, setPathReady] = useState<boolean>(false)
  const keyword = checkUrlPath()
  let writeFunction
  let logListener

  switch (keyword) {
    case 'organisation':
      writeFunction = useOrganisation
      logListener = orgLogs
      break
    case 'collection':
      writeFunction = useCollection
      logListener = collectionLogs
      break
    case 'document':
      writeFunction = useDocument
      logListener = documentLogs
    default:
      writeFunction = useOnboarding
      logListener = orgLogs
  }

  logListener({
    listener: (logs) => {
      setLogs((x) => [...x, ...logs])
    }
  })

  const { write, data, error, isLoading, isError } = writeFunction(config)

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  useEffect(() => {
    if (successPath.includes('undefined')) {
      console.log("successPath includes 'undefined' it is not ready")
      setPathReady(false)
    } else {
      console.log('Path is ready')
      setPathReady(true)
    }
  }, [successPath])

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
              {children}
              <Divider />

              <Submit write={write} />
            </form>
          </>
        )}

        {isLoading && <div>Check wallet...</div>}
        {(isPending || !pathReady) && <div>Transaction pending...</div>}
        {isSuccess && pathReady && (
          <>
            <Typography variant="h3">Success!</Typography>
            <div>
              Event details: <details>{stringify(logs[0], null, 2)}</details>
              <Button
                type="button"
                variant="contained"
                onClick={() => router.push(successPath)}
              >
                View
              </Button>
            </div>
          </>
        )}
        {isError && <div>{(error as BaseError)?.shortMessage}</div>}
      </Container>
    </Paper>
  )
}
