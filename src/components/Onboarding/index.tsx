import { useState, ReactElement } from 'react'
import Form from '@components/Form/Form'
import { useTheme } from '@mui/material/styles'
import {
  orgInfoFields,
  collectionInfoFields,
  collectionInfoDataTypes
} from '@constants/InfoConstants'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBaseCreateOrganisationAndCollectionAndAddRoles as prepareCreateOrg,
  useAltBaseOrganisationEvent as orgCreated
} from '@hooks/generated'
import {
  Box,
  TextField,
  Divider,
  Button,
  FormControl,
  IconButton,
  Tooltip,
  Card,
  CardContent
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InputTypeSelect from '@components/Form/InputTypeSelect'
import Publishers from '@components/Form/Publishers'

export default function Onboarding(): ReactElement {
  const [orgName, setOrgName] = useState<string>('')
  const [fields, setFields] = useState<string[]>(['field-1'])
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>([])
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [fieldOptions, setFieldOptions] = useState<string[][]>([[]])
  const [requiredFields, setRequiredFields] = useState<boolean[]>([])
  const [orgId, setOrgId] = useState<number>()
  const [restrictedPublishing, setRestrictedPublishing] =
    useState<boolean>(false)
  const [publisherAddresses, setPublisherAddresses] = useState<string[]>([''])
  const permissionLevelsArray = Array.from(
    { length: publisherAddresses.length },
    () => 2
  )

  const allFees = getFees().data
  const orgFee = allFees ? allFees[0] : undefined
  const collectionFee = allFees ? allFees[1] : undefined
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  const theme = useTheme()

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
    fieldNames: orgInfoFields,
    dataTypes: ['0'],
    values: ['']
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
        uniqueDocumentPerAddress: false,
        editableDocuments: true,
        restrictedPublishing: true,
        status
      },
      publisherAddresses,
      permissionLevelsArray
    ],
    value: fee
  })

  const handleRemoveField = (i) => {
    // Create a new array without the item at index i
    const newFields = fields.filter((_, index) => index !== i)
    const newFieldNames = fieldNames.filter((_, index) => index !== i)
    const newFieldDataTypes = fieldDataTypes.filter((_, index) => index !== i)
    // Update the state with the new array
    setFields(newFields)
    setFieldNames(newFieldNames)
    setFieldDataTypes(newFieldDataTypes)
  }

  return (
    <Form successPath={'/organisation/' + orgId} config={config}>
      <Card>
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
      <Box sx={{ m: 2 }}>
        {fields.map((field, i) => (
          <div key={field}>
            <FormControl sx={{ mb: 2, minWidth: 180 }}>
              <TextField
                label={'Question ' + (i + 1)}
                onChange={(e) => {
                  // Ensure fieldNames is an array before trying to spread it.
                  const currentFieldNames = Array.isArray(fieldNames)
                    ? fieldNames
                    : []
                  const updatedFieldNames = [...currentFieldNames]
                  updatedFieldNames[i] = e.target.value
                  setFieldNames(updatedFieldNames)
                }}
                sx={{ mr: 2 }}
              />
            </FormControl>
            <InputTypeSelect
              setFieldDataTypes={setFieldDataTypes}
              fieldDataTypes={fieldDataTypes}
              fieldIndex={i}
            />
            <Tooltip title="Delete this field from your schema">
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => {
                  handleRemoveField(i)
                }}
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </div>
        ))}

        <br />
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            const newFields = fields.concat(['field-' + (fields.length + 1)])
            setFields(newFields)
          }}
        >
          Add an extra field
        </Button>
      </Box>
      <Divider />
      <Publishers
        restrictedPublishing={restrictedPublishing}
        setRestrictedPublishing={setRestrictedPublishing}
        publisherAddresses={publisherAddresses}
        setPublisherAddresses={setPublisherAddresses}
      />
    </Form>
  )
}
