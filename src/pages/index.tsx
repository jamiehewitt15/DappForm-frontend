import Hero from '@components/Home/Hero'
import Features from '@components/Home/Features'
import CallToAction from '@components/Home/CallToAction'
import { Box } from '@mui/material'
import DynamicBackground from '@components/shared/Background'
import DeviceRender from '@components/shared/DeviceRender'

export function Page() {
  return (
    <>
      <DeviceRender devices={['desktop']}>
        <DynamicBackground />
      </DeviceRender>
      <Box sx={{ maxWidth: '1280px', margin: 'auto' }}>
        <Hero />
        <Features />
        <CallToAction />
      </Box>
    </>
  )
}

export default Page
