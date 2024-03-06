import { useState, ReactElement, useEffect } from 'react'
import Form from '@components/Form'
import { useTheme } from '@mui/material/styles'
import { useUserTheme } from '@context/ThemeSelectorContext'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBaseCreateOrganisationAndCollectionAndAddRoles as prepareCreateOrg,
  useAltBaseOrganisationEvent as orgCreated
} from '@hooks/generated'
import { TextField, Divider, Card, CardContent } from '@mui/material'
import Publishers from '@components/Form/Publishers'
import SwitchQuestion from '@components/Form/switchQuestion'
import Fields from '@components/Form/Fields'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'

export default function Onboarding(): ReactElement {
  const {
    orgName,
    setOrgName,
    collectionName,
    setCollectionName,
    setCollectionInfoValues,
    fieldNames,
    fieldDataTypes,
    fieldOptions,
    requiredFields,
    uniqueDocumentPerAddress,
    setUniqueDocumentPerAddress,
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

  const theme = useTheme()
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
        <Card
          sx={{
            borderTop: `10px solid ${userThemeColor}`,
            marginBottom: 2,
            borderRadius: '8px'
          }}
        >
          <CardContent>
            <TextField
              required
              id="outlined-required"
              label="Form Title"
              defaultValue="Untitled Form"
              variant="standard"
              onChange={(e) => {
                setCollectionName(e.target.value)
              }}
              sx={{ mr: 2, width: '100%' }}
              InputProps={{
                style: {
                  ...theme.typography.h1,
                  fontFamily: font
                }
              }}
            />
            <TextField
              placeholder="Form description"
              label="Form Description"
              variant="standard"
              onChange={(e) => {
                setCollectionInfoValues([e.target.value])
              }}
              sx={{ mr: 2, width: '100%' }}
            />
            <TextField
              required
              id="outlined-required"
              label="Published by?"
              variant="standard"
              placeholder="Your alias or organisation Name"
              onChange={(e) => {
                setOrgName(e.target.value)
              }}
              sx={{ mr: 2, width: '100%' }}
            />
          </CardContent>
        </Card>
        <Fields />

        <Divider />
        <Card
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 1,
            borderRadius: '8px'
          }}
        >
          <SwitchQuestion
            question="Allow users to respond multiple times?"
            labelOn="Users can submit this form multiple times"
            labelOff="Only one response per address is allowed"
            value={!uniqueDocumentPerAddress}
            setValue={(newValue: boolean) =>
              setUniqueDocumentPerAddress(!newValue)
            }
          />
          <Publishers />
        </Card>
      </Form>
    </UserThemeProvider>
  )
}
