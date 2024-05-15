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
import { useRouter } from 'next/router'

interface FormContextType {
  orgName: string
  setOrgName: Dispatch<SetStateAction<number | string | undefined>>
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
  uniqueDocumentPerAddress: boolean
  setUniqueDocumentPerAddress: Dispatch<SetStateAction<boolean>>
  orgId: number | string | undefined
  setOrgId: Dispatch<SetStateAction<number | undefined>>
  restrictedPublishing: boolean
  setRestrictedPublishing: Dispatch<SetStateAction<boolean>>
  publisherAddresses: string[]
  setPublisherAddresses: Dispatch<SetStateAction<string[]>>
  orgExists: boolean
  collectionId: number | string | undefined
  setCollectionId: Dispatch<SetStateAction<number | string | undefined>>
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
  fieldsIndex: number[]
  setFieldsIndex: Dispatch<SetStateAction<number[]>>
  fieldIds: string[]
  setFieldIds: Dispatch<SetStateAction<string[]>>
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
  const [fieldOptions, setFieldOptions] = useState<string[][]>([['']])
  const [requiredFields, setRequiredFields] = useState<boolean[]>([false])
  const [uniqueDocumentPerAddress, setUniqueDocumentPerAddress] =
    useState<boolean>(false)
  const [orgId, setOrgId] = useState<number | string>(0)
  const [restrictedPublishing, setRestrictedPublishing] =
    useState<boolean>(false)
  const [publisherAddresses, setPublisherAddresses] = useState<string[]>([])
  const [orgExists, setOrgExists] = useState<boolean>(false)
  const [collectionId, setCollectionId] = useState<number | string>(0)
  const [update, setUpdate] = useState<boolean>(false)
  const [formResponses, setFormResponses] = useState<string[]>([])
  const [fetchingData, setFetchingData] = useState<boolean>()
  const [userThemeColor, setUserThemeColor] = useState<string>('#4DA06D')
  const [userBackgroundColor, setUserBackgroundColor] = useState<string>('#fff')
  const [font, setFont] = useState<string>(customFonts[0].stack)
  const [fieldsIndex, setFieldsIndex] = useState<number[]>([])
  const [fieldIds, setFieldIds] = useState<string[]>(['field-1'])

  const { address, isConnected } = useAccount()
  const router = useRouter()

  const [addressQueryResult] = useQuery({
    query: addressQuery,
    variables: { transactionFrom: address?.toLowerCase() },
    pause: !address
  })

  console.log('collection ID', collectionId)

  const [collectionQueryResult] = useQuery({
    query: collectionQuery,
    variables: { collectionId: convertStringToHex(collectionId.toString()) },
    pause: !collectionId
  })

  useEffect(() => {
    const { data, fetching, error } = addressQueryResult
    if (!fetching && !error && data?.organisations?.length > 0) {
      const existingName = data?.organisations?.[0].organisationName?.toString()
      setOrgName(existingName)
      const id = parseInt(data?.organisations?.[0].id, 16)
      setOrgId(id)
      setOrgExists(true)
    } else {
      setOrgExists(false)
    }
  }, [addressQueryResult, address, isConnected])

  useEffect(() => {
    if (collectionId !== 0) {
      const { data, fetching, error } = collectionQueryResult
      fetching && setFetchingData(true)

      if (!fetching && !error && data && data?.collection) {
        const collection = data?.collection
        setCollectionName(collection?.collectionName)
        setCollectionDescription(collection?.description)
        setOrgName(collection?.organisation?.organisationName)
        setCollectionInfoValues(collection?.collectionInfoValues)

        // Initialize arrays to the correct length filled with placeholders or default values
        const fieldNames = new Array(collection?.fields.length)
        const fieldDataTypes = new Array(collection?.fields.length)
        const fieldOptions = new Array(collection?.fields.length).fill([])
        const requiredFields = new Array(collection?.fields.length)
        const fieldsIndex = new Array(collection?.fields.length)

        // Populate the arrays based on the index
        collection.fields.forEach((field) => {
          const index = parseInt(field?.index)
          fieldNames[index] = field?.fieldName
          fieldDataTypes[index] = parseInt(field?.fieldDataType, 10)
          fieldOptions[index] = field?.fieldOptions || []
          requiredFields[index] = field?.required
          fieldsIndex[index] = index // This is redundant if indexes are 0-based and complete
        })

        setFieldNames(fieldNames)
        setFormResponses(new Array(fieldNames?.length).fill(''))
        setFieldDataTypes(fieldDataTypes)
        setFieldOptions(fieldOptions)
        setRequiredFields(requiredFields)
        setUniqueDocumentPerAddress(collection?.uniqueDocumentPerAddress)
        setRestrictedPublishing(collection?.restrictedPublishing)
        setUserThemeColor(collection?.userThemeColor)
        setUserBackgroundColor(collection?.userBackgroundColor)
        setFont(collection?.font)
        setFieldsIndex(fieldsIndex)
        setFetchingData(false)
      }
    }
  }, [
    collectionId,
    collectionQueryResult,
    address,
    isConnected,
    router.pathname
  ])

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
    fetchingData,
    fieldsIndex,
    setFieldsIndex,
    fieldIds,
    setFieldIds
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
