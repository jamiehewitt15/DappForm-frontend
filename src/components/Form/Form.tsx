import { ReactElement, useState } from 'react'
import { BaseError } from 'viem'
import Connected from '@components/shared/Connected'
import NotConnected from '@components/shared/NotConnected'
import WrongNetwork from '@components/shared/WrongNetwork'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { stringify } from '@utils/index'
import { Box, Divider, Button, Paper, Container } from '@mui/material'
import LinearProgressWithLabel from '@components/shared/LinearProgressWithLabel'
import { useRouter } from 'next/router'

export default function Form({
  children,
  isSuccess,
  isLoading,
  isPending,
  isError,
  progress,
  write,
  logListener,
  successPath,
  error
}: {
  children: React.ReactNode
  isSuccess: boolean
  isLoading: boolean
  isPending: boolean
  isError: boolean
  progress: number
  write: () => void
  logListener: (config) => void
  successPath: string
  error?: BaseError
}): ReactElement {
  const router = useRouter()
  const [logs, setLogs] = useState<any[]>([])

  logListener({
    listener: (logs) => {
      setLogs((x) => [...x, ...logs])
    }
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
