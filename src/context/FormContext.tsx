import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent
} from 'react'

interface FormContextType {
  orgName: string
  setOrgName: React.Dispatch<React.SetStateAction<string>>
  fields: string[]
  setFields: React.Dispatch<React.SetStateAction<string[]>>
  collectionName: string
  setCollectionName: React.Dispatch<React.SetStateAction<string>>
  collectionInfoValues: string[]
  setCollectionInfoValues: React.Dispatch<React.SetStateAction<string[]>>
  fieldNames: string[]
  setFieldNames: React.Dispatch<React.SetStateAction<string[]>>
  fieldDataTypes: number[]
  setFieldDataTypes: React.Dispatch<React.SetStateAction<number[]>>
  fieldOptions: string[][]
  setFieldOptions: React.Dispatch<React.SetStateAction<string[][]>>
  requiredFields: boolean[]
  setRequiredFields: React.Dispatch<React.SetStateAction<boolean[]>>
  uniqueDocumentPerAddress: boolean
  setUniqueDocumentPerAddress: React.Dispatch<React.SetStateAction<boolean>>
  orgId: number | undefined
  setOrgId: React.Dispatch<React.SetStateAction<number | undefined>>
  restrictedPublishing: boolean
  setRestrictedPublishing: React.Dispatch<React.SetStateAction<boolean>>
  publisherAddresses: string[]
  setPublisherAddresses: React.Dispatch<React.SetStateAction<string[]>>
}

// Create a context with a default value that matches the type
const FormContext = createContext<FormContextType | undefined>(undefined)

export const FormProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const [orgName, setOrgName] = useState<string>('')
  const [fields, setFields] = useState<string[]>(['field-1'])
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>([])
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [fieldOptions, setFieldOptions] = useState<string[][]>([[]])
  const [requiredFields, setRequiredFields] = useState<boolean[]>([false])
  const [uniqueDocumentPerAddress, setUniqueDocumentPerAddress] =
    useState<boolean>(false)
  const [orgId, setOrgId] = useState<number>()
  const [restrictedPublishing, setRestrictedPublishing] =
    useState<boolean>(false)
  const [publisherAddresses, setPublisherAddresses] = useState<string[]>([])

  const value = {
    orgName,
    setOrgName,
    fields,
    setFields,
    collectionName,
    setCollectionName,
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
    setPublisherAddresses
  }
  console.log('required fields:', requiredFields)

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an FormProvider')
  }
  return context
}
