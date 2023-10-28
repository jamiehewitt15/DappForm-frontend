'use client'
import { useEffect, useState } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
import UrqlProvider from '@context/UrqlProvider'
import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles'
// import { theme } from '@utils/theme'
import { cyan, slate } from '@radix-ui/colors'

let theme = createTheme({
  typography: {
    fontWeightLight: '200',
    fontWeightRegular: '300',
    fontWeightMedium: '200',
    fontWeightBold: '200',
    h1: {
      fontFamily: 'antipasto, Helvetica, san-serif'
    },
    h2: {
      fontFamily: 'antipasto, Helvetica, san-serif',
      fontSize: '2rem',
      lineHeight: 1.5
    },
    h3: {
      fontFamily: 'antipasto, Helvetica, san-serif',
      fontSize: '1.5rem',
      lineHeight: 1.5
    },
    h4: {
      fontFamily: 'antipasto, Helvetica, san-serif'
    },
    h5: {
      fontFamily: 'antipasto, Helvetica, san-serif',
      fontSize: '1.2rem'
    }
  },
  palette: {
    primary: {
      light: cyan.cyan8,
      main: cyan.cyan9,
      dark: cyan.cyan10
    },
    secondary: {
      light: cyan.cyan8,
      main: cyan.cyan9,
      dark: cyan.cyan10
    },
    background: {
      default: cyan.cyan2,
      paper: cyan.cyan1
    },
    text: {
      primary: cyan.cyan12,
      secondary: cyan.cyan11,
      disabled: cyan.cyan10
    },
    divider: slate.slate6,
    grey: {}
  }
})

theme = responsiveFontSizes(theme)

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    capture_pageview: false // Disable automatic pageview capture, as we capture manually
  })
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  return (
    <PostHogProvider client={posthog}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <UrqlProvider>
            <ThemeProvider theme={theme}>{mounted && children} </ThemeProvider>
          </UrqlProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </PostHogProvider>
  )
}
