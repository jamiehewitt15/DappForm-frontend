'use client'

import { ReactElement, ReactNode, useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import {
  useDecentraDbIsOrgAdmin as orgAdmin,
  useDecentraDbIsCollectionPublisher as collectionPublisher,
  useDecentraDbIsDocumentUpdator as documentUpdator
} from '@hooks/generated'
import { useRouter } from 'next/router'

export default function Permission({
  children,
  scope,
  paramOrgId,
  paramCollectionId,
  paramDocumentId
}: {
  children: ReactNode
  scope: string
  paramOrgId?: string
  paramCollectionId?: string
  paramDocumentId?: string
}): ReactElement {
  const { address } = useAccount()
  const [permission, setPermission] = useState<boolean>(false)
  const [orgId, setOrgId] = useState<string>('0')
  const [collectionId, setCollectionId] = useState<string>('0')
  const [documentId, setDocumentId] = useState<string>('0')

  const router = useRouter()
  const path = router.asPath

  const pathArray = path
    .split('/')
    .filter((item) => item !== '' && !isNaN(Number(item)))

  const adminPermission = orgAdmin({
    args: [BigInt(orgId), address]
  }).data

  const collectionPermission = collectionPublisher({
    args: [BigInt(orgId), BigInt(collectionId), address]
  }).data

  const documentPermission = documentUpdator({
    args: [BigInt(orgId), BigInt(collectionId), BigInt(documentId), address]
  }).data

  useEffect(() => {
    if (path) {
      let newPermission = false
      switch (scope) {
        case 'admin':
          setOrgId(paramOrgId ? paramOrgId : pathArray[0])
          newPermission = adminPermission ? adminPermission : false
          break
        case 'publisher':
          setOrgId(paramOrgId ? paramOrgId : pathArray[0])
          setCollectionId(paramCollectionId ? paramCollectionId : pathArray[1])
          newPermission = collectionPermission ? collectionPermission : false
          break
        case 'updator':
          setOrgId(paramOrgId ? paramOrgId : pathArray[0])
          setCollectionId(paramCollectionId ? paramCollectionId : pathArray[1])
          setDocumentId(paramDocumentId ? paramDocumentId : pathArray[2])
          newPermission = documentPermission ? documentPermission : false
          break
        default:
          setPermission(false)
      }
      setPermission(newPermission ? newPermission : false)
    }
  }, [pathArray, adminPermission, collectionPermission, documentPermission])

  return <>{permission ? children : null}</>
}
