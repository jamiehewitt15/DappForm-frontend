import Hero from '@components/Home/Hero'
import Features from '@components/Home/Features'
import CallToAction from '@components/Home/CallToAction'
import { Box } from '@mui/material'

export function Page() {
  return (
    <>
      <Box sx={{ maxWidth: '1280px', margin: 'auto' }}>
        <Hero />
        <Features />
        <CallToAction />
      </Box>
    </>
  )
}

export default Page
