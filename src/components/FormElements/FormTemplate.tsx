import { ReactElement, useRef, ReactNode, useEffect } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Submit from '@components/FormElements/Submit'
import {
  Divider,
  Container,
  CircularProgress,
  Box,
  useTheme
} from '@mui/material'
import { useRouter } from 'next/router'
import { useFormContext } from '@context/FormContext'
import { useSubmit } from '@context/SubmitContext'

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
  successPath: string | undefined
  buttonText: string
  write: any
  data: any
  error: any
  isLoading: any
  isError: any
}): ReactElement {
  const theme = useTheme()
  const router = useRouter()
  const { setIsPending, setIsSuccess } = useSubmit()
  const {
    collectionId,
    requiredFields,
    formResponses,
    setCreatingOrEditing,
    creatingOrEditing
  } = useFormContext()
  const containerRef = useRef<HTMLDivElement>(null)

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    confirmations: 2,
    hash: data?.hash
  })

  useEffect(() => {
    setIsPending(isPending)
    setIsSuccess(isSuccess)
  }, [isPending, setIsPending, setIsSuccess, isSuccess])

  useEffect(() => {
    if (isSuccess && collectionId !== 0 && successPath && !creatingOrEditing) {
      router.push(successPath + collectionId)
    }
  }, [isSuccess, collectionId, successPath, creatingOrEditing])

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
      {!isSuccess ||
      collectionId === 0 ||
      router.pathname.startsWith('/discussion') ? (
        <Container
          ref={containerRef} // Attach the ref to the Container
          sx={{
            p: 2
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setCreatingOrEditing(true)
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
              isIndexing={isSuccess && collectionId === 0}
            />
          </form>
          {isError && <div>{(error as BaseError)?.shortMessage}</div>}
        </Container>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          padding="20%"
          sx={{
            [theme.breakpoints.down('sm')]: {
              padding: '10%'
            }
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  )
}
