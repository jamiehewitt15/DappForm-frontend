import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Onboarding from '@components/Onboarding'
import CreateOrgAndCollection from '@components/Publish/createOrgAndCollection'
import { Box } from '@mui/material'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'
import CreateCollection from '@components/Publish/createOrUpdateCollection'

export default function ditForm() {
  const { orgExists, setCollectionId } = useFormContext()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setCollectionId(router.query.id as string)
    }
  }, [router.query.organisationId])

  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto', padding: '3rem' }}>
      <UserThemeProvider>
        {orgExists && (
          <CreateCollection>
            <Onboarding />
          </CreateCollection>
        )}
        {!orgExists && (
          <CreateOrgAndCollection>
            <Onboarding />
          </CreateOrgAndCollection>
        )}
      </UserThemeProvider>
    </Box>
  )
}
