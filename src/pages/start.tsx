import Onboarding from '@components/Onboarding'
import CreateOrgAndCollection from '@components/Publish/createOrgAndCollection'
import { Box } from '@mui/material'
import './start.module.css'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'
import CreateCollection from '@components/Publish/createCollection'

export default function Start() {
  const { orgExists } = useFormContext()

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
