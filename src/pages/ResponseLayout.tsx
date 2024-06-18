import { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SubmitForm from '@components/Publish/SubmitForm'
import { Box } from '@mui/material'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'

export default function ResponseLayout({
  children,
  redirectOnSuccess = true
}: {
  children: ReactNode
  redirectOnSuccess?: boolean
}): ReactElement {
  const { setCollectionId } = useFormContext()
  const router = useRouter()

  useEffect(() => {
    if (
      router.isReady &&
      router.query.id &&
      typeof router.query.id === 'string'
    ) {
      if (router.query.id.startsWith('0x')) {
        setCollectionId(router.query.id)
      } else {
        const id = parseInt(router.query.id, 16)
        !isNaN(id) && setCollectionId(id)
      }
    }
  }, [router.query.id, router.isReady, router.pathname])

  return (
    <Box
      sx={{
        maxWidth: '1280px',
        margin: 'auto',
        padding: {
          xs: '1rem', // Padding for mobile devices
          sm: '2rem', // Padding for tablets
          md: '3rem' // Padding for larger screens
        },
        width: '100%' // Ensures the Box takes the full width on mobile devices
      }}
    >
      <UserThemeProvider>
        <SubmitForm redirectOnSuccess={redirectOnSuccess}>
          {children}
        </SubmitForm>
      </UserThemeProvider>
    </Box>
  )
}
