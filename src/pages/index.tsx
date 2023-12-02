import Onboarding from '@components/Onboarding'
import Hero from '@components/Home/Hero'
import UseCases from '@components/Home/UseCases'
import Pricing from '@components/Home/Pricing'
import CallToAction from '@components/Home/CallToAction'
import { Typography, Box } from '@mui/material'
import styles from './index.module.css'

export function Page() {
  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto' }}>
      <Hero />
      <UseCases />
      <Pricing />

      <Box sx={{ m: '3rem' }} className={styles.boxContainer}>
        <Onboarding />
      </Box>
      <CallToAction />
    </Box>
  )
}

export default Page
