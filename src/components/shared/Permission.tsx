'use client'

import { ReactElement, ReactNode, useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useAltBaseGetPermissionLevel as getPermissionLevel } from '@hooks/generated'
import { useRouter } from 'next/router'

export default function Permission({
  children,
  requiredLevel,
  id
}: {
  children: ReactNode
  requiredLevel: number
  id: string
}): ReactElement {
  const { address } = useAccount()
  const [permission, setPermission] = useState<boolean>(false)

  const router = useRouter()
  const path = router.asPath

  const pathArray = path
    .split('/')
    .filter((item) => item !== '' && !isNaN(Number(item)))

  const permissionLevel = Number(
    getPermissionLevel({
      args: [BigInt(id), address]
    }).data
  )

  useEffect(() => {
    if (path) {
      permissionLevel >= requiredLevel
        ? setPermission(true)
        : setPermission(false)
    }
  }, [pathArray, permissionLevel])

  return <>{permission ? children : null}</>
}
