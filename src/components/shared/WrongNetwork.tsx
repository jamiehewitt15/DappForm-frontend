import { useNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { chain, chains } = useNetwork()
  // check if chain is present in chains and return boolean
  const isChainPresent = chains.includes(chain)

  return (
    <>
      {isChainPresent && <>{children}</>}
      {!isChainPresent && <ConnectButton />}
    </>
  )
}
