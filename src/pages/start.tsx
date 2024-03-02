import Onboarding from '@components/Onboarding'
import { Box } from '@mui/material'
import './start.module.css'

export default function Start() {
  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto', padding: '3rem' }}>
      <Onboarding />
    </Box>
  )
}
