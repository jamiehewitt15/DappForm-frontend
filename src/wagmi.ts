import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { polygon, celo } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
require('dotenv').config()

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, celo],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'DecentraDB',
  chains,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})

export { chains }
