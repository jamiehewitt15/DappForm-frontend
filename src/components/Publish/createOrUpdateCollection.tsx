import { ReactElement, useEffect, ReactNode } from 'react'
import Form from '@components/Form'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBaseCreateCollectionAndAddRoles as prepareCreateCollection,
  useAltBaseOrganisationEvent as orgCreated
} from '@hooks/generated'
import { useFormContext } from '@context/FormContext'
import { useUserTheme } from '@context/ThemeSelectorContext'

export default function CreateCollection({
  children
}: {
  children: ReactNode
}): ReactElement {
  const {
    collectionName,
    fieldNames,
    fieldDataTypes,
    fieldOptions,
    requiredFields,
    uniqueDocumentPerAddress,
    orgId,
    setOrgId,
    restrictedPublishing,
    publisherAddresses,
    update
  } = useFormContext()

  const permissionLevelsArray = Array.from(
    { length: publisherAddresses.length },
    () => 2
  )

  const allFees = getFees().data
  const orgFee = allFees ? allFees[0] : undefined
  const collectionFee = allFees ? allFees[1] : undefined
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  const { userThemeColor, userBackgroundColor, font } = useUserTheme()

  useEffect(() => {
    document.body.style.backgroundColor = userBackgroundColor

    // Cleanup function to reset the background color
    return () => {
      document.body.style.backgroundColor = '' // Reset to default or previous value
    }
  }, [userBackgroundColor])

  orgCreated({
    listener: (logs) => {
      setOrgId(Number(logs[0].args.organisationId))
    }
  })

  const status = {
    update: update,
    retired: false
  }

  const collectionInfo = {
    name: collectionName,
    fieldNames: ['userThemeColor', 'userBackgroundColor', 'font'],
    dataTypes: ['0', '0', '0'],
    values: [userThemeColor, userBackgroundColor, font]
  }

  const { config } = prepareCreateCollection({
    args: [
      orgId,
      {
        collectionId: 0,
        info: collectionInfo,
        fieldNames,
        fieldOptions,
        fieldDataTypes,
        requiredFields,
        uniqueDocumentPerAddress,
        editableDocuments: false,
        restrictedPublishing,
        status
      },
      restrictedPublishing ? publisherAddresses : [],
      permissionLevelsArray
    ],
    value: fee
  })

  return (
    <Form successPath={'/organisation/' + orgId} config={config}>
      {children}
    </Form>
  )
}
