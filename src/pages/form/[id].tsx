import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SubmitForm from '@components/Publish/SubmitForm'
import { Box } from '@mui/material'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'

export default function ditForm() {
  const { setCollectionId } = useFormContext()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setCollectionId(Number(router.query.id))
    }
  }, [router.query.id])

  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto', padding: '3rem' }}>
      <UserThemeProvider>
        <SubmitForm>
          <div>Submit Form</div>
        </SubmitForm>
      </UserThemeProvider>
    </Box>
  )
}
