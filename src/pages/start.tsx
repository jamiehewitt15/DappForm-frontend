import Onboarding from '@components/Onboarding'
import Publish from '@components/Publish'
import { Box } from '@mui/material'
import './start.module.css'

export default function Start() {
  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto', padding: '3rem' }}>
      <Publish>
        <Onboarding />
      </Publish>
    </Box>
  )
}
