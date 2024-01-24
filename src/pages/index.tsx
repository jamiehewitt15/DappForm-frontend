import Onboarding from '@components/Onboarding'
import Hero from '@components/Home/Hero'
import UseCases from '@components/Home/UseCases'
import Pricing from '@components/Home/Pricing'
import Features from '@components/Home/Features'
import CallToAction from '@components/Home/CallToAction'
import { Typography, Box } from '@mui/material'
import styles from './index.module.css'
import DynamicBackground from '@components/shared/Background'

export function Page() {
  return (
    <>
      <DynamicBackground />
      <Box sx={{ maxWidth: '1280px', margin: 'auto' }}>
        <Hero />
        <UseCases />
        <Features />
        {/* <Pricing /> */}
        <CallToAction />
      </Box>
    </>
  )
}

export default Page
