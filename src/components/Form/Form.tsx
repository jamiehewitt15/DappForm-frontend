import { ReactElement, useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Connected from '@components/shared/Connected'
import NotConnected from '@components/shared/NotConnected'
import WrongNetwork from '@components/shared/WrongNetwork'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { stringify, checkUrlPath } from '@utils/index'
import { Box, Divider, Button, Paper, Container } from '@mui/material'
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
  children: React.ReactNode
  progress: number
  successPath: string
  config: any
}): ReactElement {
  const router = useRouter()
  const [logs, setLogs] = useState<any[]>([])
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
                      Submit
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
