import { useState, ReactElement, useEffect } from 'react'
import Form from '@components/Form'
import { useTheme } from '@mui/material/styles'
import {
  collectionInfoFields,
  collectionInfoDataTypes
} from '@constants/InfoConstants'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBaseCreateOrganisationAndCollectionAndAddRoles as prepareCreateOrg,
  useAltBaseOrganisationEvent as orgCreated
} from '@hooks/generated'
import { TextField, Divider, Card, CardContent } from '@mui/material'
import Publishers from '@components/Form/Publishers'
import SwitchQuestion from '@components/Form/switchQuestion'
import Fields from '@components/Form/Fields'
import { lightenColor } from '@utils/index'
import ColorPicker from '@components/Form/ColorPicker'

export default function Onboarding(): ReactElement {
  const [userThemeColor, setUserThemeColor] = useState<string>('#ff0000')
  const [orgName, setOrgName] = useState<string>('')
  const [fields, setFields] = useState<string[]>(['field-1'])
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>([])
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [fieldOptions, setFieldOptions] = useState<string[][]>([[]])
  const [requiredFields, setRequiredFields] = useState<boolean[]>([])
  const [uniqueDocumentPerAddress, setUniqueDocumentPerAddress] =
    useState<boolean>(false)
  const [orgId, setOrgId] = useState<number>()
  const [restrictedPublishing, setRestrictedPublishing] =
    useState<boolean>(false)
  const [publisherAddresses, setPublisherAddresses] = useState<string[]>([])
  const permissionLevelsArray = Array.from(
    { length: publisherAddresses.length },
    () => 2
  )

  const allFees = getFees().data
  const orgFee = allFees ? allFees[0] : undefined
  const collectionFee = allFees ? allFees[1] : undefined
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  const theme = useTheme()

  useEffect(() => {
    const lightColor = lightenColor(userThemeColor, 0.9)
    console.log(lightColor)
    document.body.style.backgroundColor = lightColor

    // Cleanup function to reset the background color
    return () => {
      document.body.style.backgroundColor = '' // Reset to default or previous value
    }
  }, [userThemeColor])

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
    fieldNames: ['userThemeColor'],
    dataTypes: ['0'],
    values: [userThemeColor]
  }

  const collectionInfo = {
    name: collectionName,
    fieldNames: collectionInfoFields,
    dataTypes: collectionInfoDataTypes,
    values: collectionInfoValues
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
        restrictedPublishing: true,
        status
      },
      publisherAddresses,
      permissionLevelsArray
    ],
    value: fee
  })

  return (
    <Form successPath={'/organisation/' + orgId} config={config}>
      <ColorPicker color={userThemeColor} changeColor={setUserThemeColor} />
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
                ...theme.typography.h1
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
      <Fields
        fieldDataTypes={fieldDataTypes}
        setFieldDataTypes={setFieldDataTypes}
        fieldNames={fieldNames}
        setFieldNames={setFieldNames}
        fields={fields}
        setFields={setFields}
        requiredFields={requiredFields}
        setRequiredFields={setRequiredFields}
      />

      <Divider />
      <SwitchQuestion
        question="Allow users to respond multiple times?"
        labelOn="Users can submit this form multiple times"
        labelOff="Only one response per address is allowed"
        value={!uniqueDocumentPerAddress}
        setValue={(newValue: boolean) => setUniqueDocumentPerAddress(!newValue)}
      />
      <Publishers
        restrictedPublishing={restrictedPublishing}
        setRestrictedPublishing={setRestrictedPublishing}
        publisherAddresses={publisherAddresses}
        setPublisherAddresses={setPublisherAddresses}
      />
    </Form>
  )
}
