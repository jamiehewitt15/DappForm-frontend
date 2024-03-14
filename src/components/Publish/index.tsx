import { ReactElement, useEffect, ReactNode } from 'react'
import Form from '@components/Form'
import { useTheme } from '@mui/material/styles'
import { useUserTheme } from '@context/ThemeSelectorContext'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBaseCreateOrganisationAndCollectionAndAddRoles as prepareCreateOrg,
  useAltBaseOrganisationEvent as orgCreated
} from '@hooks/generated'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'

export default function Publish({
  children
}: {
  children: ReactNode
}): ReactElement {
  const {
    orgName,
    collectionName,
    fieldNames,
    fieldDataTypes,
    fieldOptions,
    requiredFields,
    uniqueDocumentPerAddress,
    orgId,
    setOrgId,
    restrictedPublishing,
    publisherAddresses
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
    update: false,
    retired: false
  }

  const orgInfo = {
    name: orgName,
    fieldNames: [],
    dataTypes: [],
    values: []
  }

  const collectionInfo = {
    name: collectionName,
    fieldNames: ['userThemeColor', 'userBackgroundColor', 'font'],
    dataTypes: ['0', '0', '0'],
    values: [userThemeColor, userBackgroundColor, font]
  }

  const { config } = prepareCreateOrg({
    args: [
      {
        organisationId: 0,
        info: orgInfo,
        status
      },
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
    <UserThemeProvider>
      <Form successPath={'/organisation/' + orgId} config={config}>
        {children}
      </Form>
    </UserThemeProvider>
  )
}