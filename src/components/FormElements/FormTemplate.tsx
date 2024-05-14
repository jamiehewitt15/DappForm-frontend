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
  const containerRef = useRef<HTMLDivElement>(null)

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  useEffect(() => {
    if (isSuccess && collectionId !== 0) {
      router.push(successPath + collectionId)
    }
  }, [isSuccess, collectionId])

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
      {(!isSuccess || collectionId === 0) && (
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
              isIndexing={isSuccess && collectionId === 0}
            />
          </form>
          {isError && <div>{(error as BaseError)?.shortMessage}</div>}
        </Container>
      )}
    </>
  )
}
