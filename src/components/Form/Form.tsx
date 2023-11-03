import { ReactElement, useRef, useState, ReactNode, useEffect } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Submit from '@components/Form/Submit'
import { checkUrlPath } from '@utils/index'
import { Divider, Button, Paper, Container, Typography } from '@mui/material'
import LinearProgressWithLabel from '@components/shared/LinearProgressWithLabel'
import { useRouter } from 'next/router'
import {
  useDecentraDbCreateOrUpdateOrganisation as useOrganisation,
  useDecentraDbPublishOrUpdateDocument as useDocument,
  useDecentraDbCreateOrUpdateCollection as useCollection,
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
  const [containerSize, setContainerSize] = useState<{
    width?: number
    height?: number
  }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const keyword = checkUrlPath()
  let writeFunction

  switch (keyword) {
    case 'organisation':
      writeFunction = useOrganisation
      break
    case 'collection':
      writeFunction = useCollection
      break
    case 'document':
      writeFunction = useDocument
    default:
      writeFunction = useOnboarding
  }
  const { write, data, error, isLoading, isError } = writeFunction(config)

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  useEffect(() => {
    if (containerRef.current && !containerSize.height && !containerSize.width) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setContainerSize({ width, height })
    }
  }, [children, containerSize])

  return (
    <Paper elevation={3}>
      {!isSuccess && (
        <Container
          ref={containerRef} // Attach the ref to the Container
          sx={{
            p: 2
          }}
        >
          <LinearProgressWithLabel value={progress} />
          <form
            onSubmit={(e) => {
              e.preventDefault()
              write?.()
            }}
          >
            {children}
            <Divider />
            <Submit write={write} isLoading={isLoading} isPending={isPending} />
          </form>
          {isError && <div>{(error as BaseError)?.shortMessage}</div>}
        </Container>
      )}
      {isSuccess && (
        <Container
          ref={containerRef} // Attach the ref to the Container
          sx={{
            p: 2,
            display: 'flex', // Use flexbox to align children
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center children horizontally
            justifyContent: 'center', // Center children vertically
            // Apply the stored dimensions as inline styles
            ...(containerSize.width && { width: containerSize.width }),
            ...(containerSize.height && { height: containerSize.height })
          }}
        >
          <Typography variant="h3">Success!</Typography>
          <div>
            <Button
              type="button"
              variant="contained"
              onClick={() => router.push(successPath)}
            >
              View
            </Button>
          </div>
        </Container>
      )}
    </Paper>
  )
}
