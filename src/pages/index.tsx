import Onboarding from '@components/Onboarding'
import Hero from '@components/Home/Hero'
import UseCases from '@components/Home/UseCases'
import { Typography, Box } from '@mui/material'
import styles from './index.module.css'

export function Page() {
  return (
    <Box sx={{ p: '1rem' }}>
      <Hero />
      <UseCases />

      <Box sx={{ m: '3rem' }} className={styles.boxContainer}>
        <Onboarding />
      </Box>
    </Box>
  )
}

export default Page
