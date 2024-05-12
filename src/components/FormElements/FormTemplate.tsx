import { ReactElement, useRef, useState, ReactNode, useEffect } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Submit from '@components/FormElements/Submit'
import {
  Divider,
  Button,
  Container,
  Typography,
  CircularProgress
} from '@mui/material'
import { useRouter } from 'next/router'
import { useFormContext } from '@context/FormContext'

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
  const { collectionId, requiredFields, formResponses } = useFormContext()
  const [containerSize, setContainerSize] = useState<{
    width?: number
    height?: number
  }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  useEffect(() => {
    if (containerRef.current && !containerSize.height && !containerSize.width) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setContainerSize({ width, height })
    }
  }, [children, containerSize])

  // add validation to check if all required fields are filled out
  function validateForm(): boolean {
    // no validation needed for the onboarding page
    if (router.pathname.startsWith('/start')) {
      return true
    }
    const isFormValid = requiredFields.every((isRequired, i) => {
      // Ensure response exists and is not empty if the field is required
      return (
        !isRequired ||
        (formResponses[i] !== undefined && formResponses[i] !== '')
      )
    })

    if (!isFormValid) {
      alert('Please fill all required fields.')
      return false
    }
    return true
  }

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
              validateForm() && write?.()
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
            pt: 20,
            display: 'flex', // Use flexbox to align children
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center children horizontally
            justifyContent: 'top', // Center children vertically
            // Apply the stored dimensions as inline styles
            ...(containerSize.width && { width: containerSize.width }),
            ...(containerSize.height && { height: containerSize.height })
          }}
        >
          {collectionId === 0 ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h3">Success!</Typography>
              <Button
                type="button"
                variant="contained"
                onClick={() => router.push(successPath + collectionId)}
              >
                View
              </Button>
            </>
          )}
        </Container>
      )}
    </>
  )
}
