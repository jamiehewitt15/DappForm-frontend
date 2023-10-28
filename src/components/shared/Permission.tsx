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
  console.log('orgId', orgId)
  console.log('collectionId', collectionId)
  console.log('documentId', documentId)

  const router = useRouter()
  const path = router.asPath
  console.log('path', path)
  console.log('scope', scope)

  const pathArray = path
    .split('/')
    .filter((item) => item !== '' && !isNaN(Number(item)))
  console.log('pathArray', pathArray)

  const adminPermission = orgAdmin({
    args: [BigInt(orgId), address]
  }).data
  const collectionPermission = collectionPublisher({
    args: [BigInt(orgId), BigInt(collectionId), address]
  }).data
  console.log('collectionPermission', collectionPermission)
  const documentPermission = documentUpdator({
    args: [BigInt(orgId), BigInt(collectionId), BigInt(documentId), address]
  }).data

  useEffect(() => {
    if (path) {
      let newPermission = false
      switch (scope) {
        case 'admin':
          console.log('checking if user is org admin')
          setOrgId(paramOrgId ? paramOrgId : pathArray[0])
          newPermission = adminPermission ? adminPermission : false
          break
        case 'publisher':
          console.log(
            'checking if user is collection publisher',
            collectionPermission
          )
          setOrgId(paramOrgId ? paramOrgId : pathArray[0])
          setCollectionId(paramCollectionId ? paramCollectionId : pathArray[1])
          newPermission = collectionPermission ? collectionPermission : false
          console.log('collection permission', permission)
          break
        case 'updator':
          console.log(
            'checking if user is document updator',
            documentPermission
          )
          setOrgId(paramOrgId ? paramOrgId : pathArray[0])
          setCollectionId(paramCollectionId ? paramCollectionId : pathArray[1])
          setDocumentId(paramDocumentId ? paramDocumentId : pathArray[2])
          newPermission = documentPermission ? documentPermission : false
          break
        default:
          setPermission(false)
      }
      setPermission(newPermission ? newPermission : false)
      console.log('permission', permission)
    }
  }, [pathArray, adminPermission, collectionPermission, documentPermission])

  console.log('END permission', permission)
  return <>{permission ? children : null}</>
}
