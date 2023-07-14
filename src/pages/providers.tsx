'use client'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import UrqlProvider from '@context/UrqlProvider'
import { ThemeProvider, createTheme } from '@mui/material/styles'
// import { theme } from '@utils/theme'
import { cyan, slate } from '@radix-ui/colors'

const theme = createTheme({
  typography: {
    fontFamily: 'antipasto, Helvetica, san-serif',
    fontWeightLight: '200',
    fontWeightRegular: '300',
    fontWeightMedium: '500',
    fontWeightBold: '600'
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

import { chains, config } from '../wagmi'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <UrqlProvider>
          <ThemeProvider theme={theme}>{mounted && children} </ThemeProvider>
        </UrqlProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
