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
        <Features
          title="Start on-chain discussions"
          items={[
            'Set the topic for your discussion.',
            'Vote for your favourite responses.',
            'Downvote responses you disagree with.',
            'Comment on the response.',
            'All responses & votes are stored on-chain'
          ]}
          imageLink="/discussion-screenshot-2024-06-18.png"
          exampleLink="/discussion/0x33"
        />
        <Features
          title="Easy to use form builder"
          items={[
            'Write your questions.',
            'Set the response types.',
            'Define required fields',
            'Decide who is allowed to respond.',
            'Sign 1 transaction to publish.'
          ]}
          imageLink="/form-screenshot.png"
          exampleLink="/form/63"
        />
        <CallToAction />
      </Box>
    </>
  )
}

export default Page
