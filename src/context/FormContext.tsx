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
import { addressQuery } from '@src/queries/address'
import { collectionQuery } from '@src/queries/collection'
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
  setOrgId: Dispatch<SetStateAction<number | string | undefined>>
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
  collectionType: string
  fetchingData: boolean
  fieldsIndex: number[]
  setFieldsIndex: Dispatch<SetStateAction<number[]>>
  fieldIds: string[]
  setFieldIds: Dispatch<SetStateAction<string[]>>
  creatingOrEditing: boolean
  setCreatingOrEditing: Dispatch<SetStateAction<boolean>>
}

const FormContext = createContext<FormContextType | undefined>(undefined)

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : defaultValue
}

export const FormProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const [orgName, setOrgName] = useState<string>(
    loadFromLocalStorage('orgName', '')
  )
  const [collectionName, setCollectionName] = useState<string>(
    loadFromLocalStorage('collectionName', '')
  )
  const [collectionDescription, setCollectionDescription] = useState<string>(
    loadFromLocalStorage('collectionDescription', '')
  )
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>(
    loadFromLocalStorage('collectionInfoValues', [])
  )
  const [fieldNames, setFieldNames] = useState<string[]>(
    loadFromLocalStorage('fieldNames', [])
  )
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>(
    loadFromLocalStorage('fieldDataTypes', [])
  )
  const [fieldOptions, setFieldOptions] = useState<string[][]>(
    loadFromLocalStorage('fieldOptions', [['']])
  )
  const [requiredFields, setRequiredFields] = useState<boolean[]>(
    loadFromLocalStorage('requiredFields', [false])
  )
  const [uniqueDocumentPerAddress, setUniqueDocumentPerAddress] =
    useState<boolean>(loadFromLocalStorage('uniqueDocumentPerAddress', false))
  const [orgId, setOrgId] = useState<number | string>(
    loadFromLocalStorage('orgId', 0)
  )
  const [restrictedPublishing, setRestrictedPublishing] = useState<boolean>(
    loadFromLocalStorage('restrictedPublishing', false)
  )
  const [publisherAddresses, setPublisherAddresses] = useState<string[]>(
    loadFromLocalStorage('publisherAddresses', [])
  )
  const [orgExists, setOrgExists] = useState<boolean>(
    loadFromLocalStorage('orgExists', false)
  )
  const [collectionId, setCollectionId] = useState<number | string>(
    loadFromLocalStorage('collectionId', 0)
  )
  const [update, setUpdate] = useState<boolean>(
    loadFromLocalStorage('update', false)
  )
  const [formResponses, setFormResponses] = useState<string[]>(
    loadFromLocalStorage('formResponses', [])
  )
  const [fetchingData, setFetchingData] = useState<boolean>(
    loadFromLocalStorage('fetchingData', false)
  )
  const [userThemeColor, setUserThemeColor] = useState<string>(
    loadFromLocalStorage('userThemeColor', '#4DA06D')
  )
  const [userBackgroundColor, setUserBackgroundColor] = useState<string>(
    loadFromLocalStorage('userBackgroundColor', '#dbece2')
  )
  const [font, setFont] = useState<string>(
    loadFromLocalStorage('font', customFonts[0].stack)
  )
  const [collectionType, setCollectionType] = useState<string>('')
  const [fieldsIndex, setFieldsIndex] = useState<number[]>(
    loadFromLocalStorage('fieldsIndex', [])
  )
  const [fieldIds, setFieldIds] = useState<string[]>(
    loadFromLocalStorage('fieldIds', ['field-1'])
  )
  const [creatingOrEditing, setCreatingOrEditing] = useState<boolean>(false)

  const { address, isConnected } = useAccount()
  const router = useRouter()

  const [addressQueryResult] = useQuery({
    query: addressQuery,
    variables: { transactionFrom: address?.toLowerCase() },
    pause: !address
  })

  const [collectionQueryResult] = useQuery({
    query: collectionQuery,
    variables: { collectionId: convertStringToHex(collectionId.toString()) },
    pause: !collectionId
  })

  const contextValues = {
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
    collectionType,
    fetchingData,
    fieldsIndex,
    setFieldsIndex,
    fieldIds,
    setFieldIds,
    creatingOrEditing,
    setCreatingOrEditing
  }

  useEffect(() => {
    Object.keys(contextValues).forEach((key) => {
      const stateValue = contextValues[key]
      if (typeof stateValue !== 'function') {
        saveToLocalStorage(key, stateValue)
      }
    })
  }, [contextValues])

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
        setOrgId(collection?.organisation?.id)
        setCollectionInfoValues(collection?.collectionInfoValues)

        const fieldNames = new Array(collection?.fields.length)
        const fieldDataTypes = new Array(collection?.fields.length)
        const fieldOptions = new Array(collection?.fields.length).fill([])
        const requiredFields = new Array(collection?.fields.length)
        const fieldsIndex = new Array(collection?.fields.length)

        collection?.fields?.forEach((field) => {
          const index = parseInt(field?.index)
          fieldNames[index] = field?.fieldName
          fieldDataTypes[index] = parseInt(field?.fieldDataType, 10)
          fieldOptions[index] = field?.fieldOptions || []
          requiredFields[index] = field?.required
          fieldsIndex[index] = index
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
        setCollectionType(collection?.collectionType)
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

  return (
    <FormContext.Provider value={contextValues}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an FormProvider')
  }
  return context
}
