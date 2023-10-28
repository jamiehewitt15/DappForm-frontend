import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
require('dotenv').config()

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'DecentraDB',
  chains,
  projectId: '833d6fe01056ae1642b970ee6e510e06' //process.env.NEXT_PROJECT_ID
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})

export { chains }
