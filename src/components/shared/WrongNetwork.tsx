import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { chain, chains } = useNetwork()
  const [wrongChain, setWrongChain] = useState<boolean>(false)

  useEffect(() => {
    chains.forEach((c) => {
      if (c.id === chain.id) {
        setWrongChain(false)
        return
      } else {
        setWrongChain(true)
      }
    })
  }, [chain, chains])

  return <>{wrongChain ? <ConnectButton /> : children}</>
}
