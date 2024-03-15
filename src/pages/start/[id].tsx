import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Onboarding from '@components/Onboarding'
import CreateOrEditForm from '@components/Publish/createOrEditForm'
import { Box } from '@mui/material'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'

export default function ditForm() {
  const { setCollectionId, setUpdate } = useFormContext()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setCollectionId(router.query.id as string)
      if (router.query.id !== '0') {
        setUpdate(true)
      } else {
        setUpdate(false)
      }
    }
  }, [router.query.organisationId])

  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto', padding: '3rem' }}>
      <UserThemeProvider>
        <CreateOrEditForm>
          <Onboarding />
        </CreateOrEditForm>
      </UserThemeProvider>
    </Box>
  )
}
