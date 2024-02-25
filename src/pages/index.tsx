import Hero from '@components/Home/Hero'
import UseCases from '@components/Home/UseCases'
import Features from '@components/Home/Features'
import CallToAction from '@components/Home/CallToAction'
import { Box } from '@mui/material'
import DynamicBackground from '@components/shared/Background'

export function Page() {
  return (
    <>
      <DynamicBackground />
      <Box sx={{ maxWidth: '1280px', margin: 'auto' }}>
        <Hero />
        <UseCases />
        <Features />
        <CallToAction />
      </Box>
    </>
  )
}

export default Page
