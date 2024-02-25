import { useState, ReactElement } from 'react'
import Form from '@components/Form/Form'
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
  Switch,
  FormControlLabel,
  Tooltip,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { increaseProgress } from '@utils/index'
import InputTypeSelect from '@components/Form/InputTypeSelect'

export default function Onboarding(): ReactElement {
  const [progress, setProgress] = useState<number>(0)
  const [orgName, setOrgName] = useState<string>('')
  const [fields, setFields] = useState<string[]>(['field-1'])
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>([])
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [addPublishers, setAddPublishers] = useState<boolean>(false)
  const [orgId, setOrgId] = useState<number>()
  const publishers = ['0x0000000000000000000000000000000000000000']

  const allFees = getFees().data
  const orgFee = allFees ? allFees[0] : undefined
  const collectionFee = allFees ? allFees[1] : undefined
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  orgCreated({
    listener: (logs) => {
      setOrgId(Number(logs[0].args.organisationId))
    }
  })

  const { config } = prepareCreateOrg({
    args: [
      {
        organisationId: 0,
        organisationName: orgName,
        infoFields: orgInfoFields,
        infoDataTypes: ['0'],
        infoValues: ['test'],
        update: false,
        retired: false
      },
      {
        collectionId: 0,
        organisationId: 0,
        collectionName: collectionName,
        infoFields: collectionInfoFields,
        infoDataTypes: collectionInfoDataTypes,
        infoValues: collectionInfoValues,
        fieldNames: fieldNames,
        fieldOptions: [[]],
        fieldDataTypes: fieldDataTypes,
        update: false,
        retired: false
      },
      publishers
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
    <Form
      progress={progress}
      successPath={'/organisation/' + orgId}
      config={config}
    >
      <Box sx={{ m: 2 }}>
        <TextField
          required
          id="outlined-required"
          label="Form Title"
          placeholder="Form Title"
          variant="filled"
          onChange={(e) => {
            setCollectionName(e.target.value)
          }}
          onBlur={() => {
            setProgress(increaseProgress(progress, 5))
          }}
          sx={{ mr: 2, mb: 2 }}
        />
        <TextField
          placeholder="Form description"
          label="Form Description"
          onChange={(e) => {
            setCollectionInfoValues([e.target.value])
          }}
          onBlur={() => {
            setProgress(increaseProgress(progress, 5))
          }}
        />
        <Typography variant="h5">Form published by?</Typography>
        <TextField
          required
          id="outlined-required"
          label="Your alias or Organisation"
          placeholder="Your organisation Name"
          onChange={(e) => {
            setOrgName(e.target.value)
          }}
          onBlur={() => {
            setProgress(increaseProgress(progress, 5))
          }}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <h4>Here you can define the schema for your collection</h4>

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
                onBlur={() => {
                  setProgress(increaseProgress(progress, 5))
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
      <Box sx={{ m: 2 }}>
        <Typography variant="h3">Can anyone respond to this form?</Typography>
        <FormControlLabel
          control={<Switch defaultChecked color="secondary" />}
          label={
            addPublishers
              ? 'Only approved addresses can respond'
              : 'Anyone answer and submit this form'
          }
          onClick={() => {
            setAddPublishers(!addPublishers)
          }}
        />
      </Box>
      {addPublishers && (
        <>
          <Divider />
          <Box sx={{ m: 2 }}>
            <Typography variant="h3">
              Would you like to add some publishers now?
            </Typography>
            <TextField
              label="Publisher address 1"
              helperText="You can also do this later"
            />
          </Box>
        </>
      )}
    </Form>
  )
}
