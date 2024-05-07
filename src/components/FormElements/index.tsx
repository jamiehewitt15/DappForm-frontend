import { ReactElement, useRef, useState, ReactNode, useEffect } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Submit from '@components/FormElements/Submit'
import { checkUrlPath } from '@utils/index'
import { Divider, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import {
  useAltBaseCreateOrUpdateOrganisation as useOrganisation,
  useAltBasePublishOrUpdateDocument as useDocument,
  useAltBaseCreateOrUpdateCollection as useCollection,
  useAltBaseCreateOrUpdateOrganisationAndCollectionAndAddRoles as useOnboarding
} from '@hooks/generated'

export default function Form({
  children,
  successPath,
  config
}: {
  children: ReactNode
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
  console.log('keyword', keyword)
  let writeFunction
  let buttonText = 'Submit'

  switch (keyword) {
    case 'organisation':
      writeFunction = useOrganisation
      break
    case 'collection':
      writeFunction = useCollection
      break
    case 'form':
      writeFunction = useDocument
      buttonText = 'Submit Response'
      break
    default:
      writeFunction = useOnboarding
      buttonText = 'Publish Form'
  }
  console.log('button Text', buttonText)

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
    <>
      {!isSuccess && (
        <Container
          ref={containerRef} // Attach the ref to the Container
          sx={{
            p: 2
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              write?.()
            }}
          >
            {children}
            <Divider />
            <Submit
              write={write}
              buttonText={buttonText}
              isLoading={isLoading}
              isPending={isPending}
            />
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
    </>
  )
}
