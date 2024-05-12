import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  Dispatch,
  SetStateAction
} from 'react'
import { useQuery } from 'urql'
import { addressQuery } from '@queries/v1/address'
import { collectionQuery } from '@queries/v1/collection'
import { useAccount } from 'wagmi'
import { convertStringToHex } from '@utils/params'
import { customFonts } from '@constants/Fonts'

interface FormContextType {
  orgName: string
  setOrgName: Dispatch<SetStateAction<string>>
  collectionName: string
  setCollectionName: Dispatch<SetStateAction<string>>
  collectionDescription: string
  setCollectionDescription: Dispatch<SetStateAction<string>>
  collectionInfoValues: string[]
  setCollectionInfoValues: Dispatch<SetStateAction<string[]>>
  fieldNames: string[]
  setFieldNames: Dispatch<SetStateAction<string[]>>
  fieldDataTypes: number[]
  setFieldDataTypes: Dispatch<SetStateAction<number[]>>
  fieldOptions: string[][]
  setFieldOptions: Dispatch<SetStateAction<string[][]>>
  requiredFields: boolean[]
  setRequiredFields: Dispatch<SetStateAction<boolean[]>>
  fieldIndex: number[]
  setFieldIndex: Dispatch<SetStateAction<number[]>>
  uniqueDocumentPerAddress: boolean
  setUniqueDocumentPerAddress: Dispatch<SetStateAction<boolean>>
  orgId: number | undefined
  setOrgId: Dispatch<SetStateAction<number | undefined>>
  restrictedPublishing: boolean
  setRestrictedPublishing: Dispatch<SetStateAction<boolean>>
  publisherAddresses: string[]
  setPublisherAddresses: Dispatch<SetStateAction<string[]>>
  orgExists: boolean
  collectionId: number
  setCollectionId: Dispatch<SetStateAction<number>>
  update: boolean
  setUpdate: Dispatch<SetStateAction<boolean>>
  formResponses: string[]
  setFormResponses: Dispatch<SetStateAction<string[]>>
  userThemeColor: string
  setUserThemeColor: Dispatch<SetStateAction<string>>
  userBackgroundColor: string
  setUserBackgroundColor: Dispatch<SetStateAction<string>>
  font: string
  setFont: Dispatch<SetStateAction<string>>
  fetchingData: boolean
}

// Create a context with a default value that matches the type
const FormContext = createContext<FormContextType | undefined>(undefined)

export const FormProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const [orgName, setOrgName] = useState<string>('')
  const [collectionName, setCollectionName] = useState<string>('Untitled Form')
  const [collectionDescription, setCollectionDescription] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>([])
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [fieldOptions, setFieldOptions] = useState<string[][]>([[]])
  const [requiredFields, setRequiredFields] = useState<boolean[]>([false])
  const [fieldIndex, setFieldIndex] = useState<number[]>([0])
  const [uniqueDocumentPerAddress, setUniqueDocumentPerAddress] =
    useState<boolean>(false)
  const [orgId, setOrgId] = useState<number>(0)
  const [restrictedPublishing, setRestrictedPublishing] =
    useState<boolean>(false)
  const [publisherAddresses, setPublisherAddresses] = useState<string[]>([])
  const [orgExists, setOrgExists] = useState<boolean>(false)
  const [collectionId, setCollectionId] = useState<number>(0)
  const [update, setUpdate] = useState<boolean>(false)
  const [formResponses, setFormResponses] = useState<string[]>([])
  const [fetchingData, setFetchingData] = useState<boolean>(true)
  const [userThemeColor, setUserThemeColor] = useState<string>('#4DA06D')
  const [userBackgroundColor, setUserBackgroundColor] = useState<string>('#fff')
  const [font, setFont] = useState<string>(customFonts[0].stack)

  const { address, isConnected } = useAccount()

  const [addressQueryResult] = useQuery({
    query: addressQuery,
    variables: { transactionFrom: address?.toLowerCase() }
  })

  const [collectionQueryResult] = useQuery({
    query: collectionQuery,
    variables: { collectionId: convertStringToHex(collectionId.toString()) }
  })

  useEffect(() => {
    const { data, fetching, error } = addressQueryResult
    if (!fetching && !error && data.organisations.length > 0) {
      const existingName = data.organisations[0].organisationName.toString()
      setOrgName(existingName)
      const id = parseInt(data.organisations[0].id, 16)
      setOrgId(id)
      setOrgExists(true)
    } else {
      setOrgExists(false)
    }
  }, [addressQueryResult, address, isConnected])

  useEffect(() => {
    if (collectionId !== 0) {
      const { data, fetching, error } = collectionQueryResult

      if (!fetching && !error && data && data.collection) {
        const collection = data.collection
        setCollectionName(collection.collectionName)
        setCollectionDescription(collection.description)
        setOrgName(collection.organisation.organisationName)
        setCollectionInfoValues(collection.collectionInfoValues)
        setFieldNames(collection.fields.map((field: any) => field.fieldName))
        setFieldDataTypes(
          collection.fields.map((field: any) =>
            parseInt(field.fieldDataType, 10)
          )
        )
        setFieldOptions(
          collection.fields.map((field: any) => field.fieldOptions || [])
        )
        setFieldIndex(
          collection.fields.map((field: any) => parseInt(field.index, 10))
        )
        setRequiredFields(collection.fields.map((field: any) => field.required))
        setUniqueDocumentPerAddress(collection.uniqueDocumentPerAddress)
        setRestrictedPublishing(collection.restrictedPublishing)
        setUserThemeColor(collection.userThemeColor)
        setUserBackgroundColor(collection.userBackgroundColor)
        setFont(collection.font)
        setFetchingData(false)
      }
    } else {
      console.log('no data')
      if (!orgName) {
        setOrgName('')
      }
      setCollectionName('Untitled Form')
      setCollectionInfoValues([])
      setFieldNames([])
      setFieldDataTypes([])
      setFieldOptions([[]])
      setRequiredFields([false])
      setUniqueDocumentPerAddress(false)
      setOrgId(0)
      setRestrictedPublishing(false)
      setPublisherAddresses([])
    }
  }, [collectionId, collectionQueryResult, address, isConnected])

  const value = {
    orgName,
    setOrgName,
    collectionName,
    setCollectionName,
    collectionDescription,
    setCollectionDescription,
    collectionInfoValues,
    setCollectionInfoValues,
    fieldNames,
    setFieldNames,
    fieldDataTypes,
    setFieldDataTypes,
    fieldOptions,
    setFieldOptions,
    requiredFields,
    setRequiredFields,
    fieldIndex,
    setFieldIndex,
    uniqueDocumentPerAddress,
    setUniqueDocumentPerAddress,
    orgId,
    setOrgId,
    restrictedPublishing,
    setRestrictedPublishing,
    publisherAddresses,
    setPublisherAddresses,
    orgExists,
    collectionId,
    setCollectionId,
    update,
    setUpdate,
    formResponses,
    setFormResponses,
    userThemeColor,
    setUserThemeColor,
    userBackgroundColor,
    setUserBackgroundColor,
    font,
    setFont,
    fetchingData
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an FormProvider')
  }
  return context
}
