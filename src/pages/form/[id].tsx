import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SubmitForm from '@components/Publish/SubmitForm'
import Form from '@components/Form'
import { Box } from '@mui/material'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'

export default function ditForm() {
  const { setCollectionId } = useFormContext()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && router.query.id) {
      console.log('Number(router.query.id)', Number(router.query.id))
      setCollectionId(Number(router.query.id))
    }
  }, [router.query.id])

  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto', padding: '3rem' }}>
      <UserThemeProvider>
        <SubmitForm>
          <Form />
        </SubmitForm>
      </UserThemeProvider>
    </Box>
  )
}
