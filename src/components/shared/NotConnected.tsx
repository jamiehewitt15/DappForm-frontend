'use client'

import { useAccount } from 'wagmi'

export default function NotConnected({
  children
}: {
  children: React.ReactNode
}) {
  const { isConnected } = useAccount()

  if (isConnected) return null
  return <>{children}</>
}
