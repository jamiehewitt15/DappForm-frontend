import { ReactElement, useRef, useState, ReactNode, useEffect } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Submit from '@components/FormElements/Submit'
import { Divider, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function FormTemplate({
  children,
  successPath,
  buttonText,
  write,
  data,
  error,
  isLoading,
  isError
}: {
  children: ReactNode
  successPath: string
  buttonText: string
  write: any
  data: any
  error: any
  isLoading: any
  isError: any
}): ReactElement {
  const router = useRouter()
  const [containerSize, setContainerSize] = useState<{
    width?: number
    height?: number
  }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  console.log('button Text', buttonText)

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
