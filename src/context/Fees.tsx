import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactElement,
  ReactNode
} from 'react'
import { useContractRead } from 'wagmi'
import { ContractConfig } from '../contracts'

export interface FeeProviderValue {
  orgCreationFee: string
  collectionCreationFee: string
  docCreationFee: string
  orgUpdateFee: string
  collectionUpdateFee: string
  documentUpdateFee: string
  isRefetching: boolean
  refetch: any
}

const FeeContext = createContext({} as FeeProviderValue)

function FeeProvider({
  children
}: {
  did: string
  children: ReactNode
}): ReactElement {
  const [orgCreationFee, setOrgCreationFee] = useState<string>()
  const [collectionCreationFee, setCollectionCreationFee] = useState<string>()
  const [docCreationFee, setDocCreationFee] = useState<string>()
  const [orgUpdateFee, setOrgUpdateFee] = useState<string>()
  const [collectionUpdateFee, setCollectionUpdateFee] = useState<string>()
  const [documentUpdateFee, setDocumentUpdateFee] = useState<string>()
  const [isRefetching, setIsRefetching] = useState<boolean>(false)
  const [refetch, setRefetch] = useState<any>()

  // -----------------------------------
  // Get and set fees
  // -----------------------------------
  useEffect(() => {
    const { data, isRefetching, refetch } = useContractRead({
      ...ContractConfig,
      functionName: 'getFees'
    })
    setOrgCreationFee(data[0])
    setCollectionCreationFee(data[1])
    setDocCreationFee(data[2])
    setOrgUpdateFee(data[3])
    setCollectionUpdateFee(data[4])
    setDocumentUpdateFee(data[5])
    setIsRefetching(isRefetching)
    setRefetch(refetch)
  }, [])

  return (
    <FeeContext.Provider
      value={
        {
          orgCreationFee,
          collectionCreationFee,
          docCreationFee,
          orgUpdateFee,
          collectionUpdateFee,
          documentUpdateFee,
          isRefetching,
          refetch
        } as FeeProviderValue
      }
    >
      {children}
    </FeeContext.Provider>
  )
}

// Helper hook to access the provider values
const useFees = (): FeeProviderValue => useContext(FeeContext)

export { FeeProvider, useFees, FeeContext }
export default FeeProvider
