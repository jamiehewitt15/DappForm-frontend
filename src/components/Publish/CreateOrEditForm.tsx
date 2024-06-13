import { ReactElement, useEffect, useState, ReactNode } from 'react'
import FormTemplate from '@components/FormElements/FormTemplate'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBaseCreateOrUpdateOrganisationAndCollectionAndAddRoles as prepareCreateOrEdit,
  useAltBaseCreateOrUpdateOrganisationAndCollectionAndAddRoles as createOrEdit,
  useAltBaseCollectionEvent as collectionCreated
} from '@hooks/generated'
import { useFormContext } from '@context/FormContext'
import { useRouter } from 'next/router'

export default function CreateOrEditForm({
  children
}: {
  children: ReactNode
}): ReactElement {
  const [successPath, setSuccessPath] = useState<string | undefined>('/form/')
  const {
    orgName,
    collectionName,
    fieldNames,
    fieldDataTypes,
    fieldOptions,
    requiredFields,
    uniqueDocumentPerAddress,
    orgId,
    restrictedPublishing,
    publisherAddresses,
    update,
    collectionId,
    setCollectionId,
    collectionDescription,
    userThemeColor,
    userBackgroundColor,
    font,
    setCreatingOrEditing
  } = useFormContext()
  const router = useRouter()

  const permissionLevelsArray = Array.from(
    { length: publisherAddresses.length },
    () => 2
  )

  const allFees = getFees().data
  const orgFee = allFees ? allFees[0] : undefined
  const collectionFee = allFees ? allFees[1] : undefined
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  useEffect(() => {
    if (router.pathname.startsWith('/start/form')) {
      setSuccessPath('/form/')
    } else if (router.pathname.startsWith('/start/discussion')) {
      setSuccessPath('/discussion/')
    }
  }, [router.pathname])

  useEffect(() => {
    document.body.style.backgroundColor = userBackgroundColor

    // Cleanup function to reset the background color
    return () => {
      document.body.style.backgroundColor = '' // Reset to default or previous value
    }
  }, [userBackgroundColor])

  collectionCreated({
    listener: (logs) => {
      if (logs[0].args.collectionId) {
        const id = Number(logs[0].args.collectionId)
        !isNaN(id) && setCollectionId(id)
        setCreatingOrEditing(false)
      }
    }
  })

  const status = {
    update,
    retired: false //  TODO: add a way to retire an org, hardcoded for now
  }

  const orgInfo = {
    name: orgName,
    // These remain hardcoded for now as we are not collection any additional info about the organisation
    fieldNames: [],
    dataTypes: [],
    values: []
  }

  const collectionInfo = {
    name: collectionName,
    fieldNames: [
      'userThemeColor',
      'userBackgroundColor',
      'font',
      'description'
    ],
    dataTypes: ['0', '0', '0', '0'],
    values: [userThemeColor, userBackgroundColor, font, collectionDescription]
  }

  const { config } = prepareCreateOrEdit({
    args: [
      {
        organisationId: orgId,
        info: orgInfo,
        status
      },
      {
        collectionId,
        info: collectionInfo,
        fieldNames,
        fieldOptions,
        fieldDataTypes,
        requiredFields,
        uniqueDocumentPerAddress,
        editableDocuments: false, // TODO: enable editing of documents
        restrictedPublishing,
        status
      },
      restrictedPublishing ? publisherAddresses : [],
      permissionLevelsArray
    ],
    value: fee
  })

  const { write, data, error, isLoading, isError } = createOrEdit(config)

  return (
    <FormTemplate
      successPath={successPath}
      buttonText="Publish Form"
      write={write}
      data={data}
      error={error}
      isLoading={isLoading}
      isError={isError}
    >
      {children}
    </FormTemplate>
  )
}
