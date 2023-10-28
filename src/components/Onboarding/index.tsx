import { useState, ReactElement } from 'react'
import Form from '@components/Form/Form'
import {
  orgInfoFields,
  orgInfoDataTypes,
  collectionInfoFields,
  collectionInfoDataTypes
} from '@constants/InfoConstants'
import datatypes from '@constants/datatypes.json'
import {
  useDecentraDbOrgCreationFee,
  useDecentraDbCollectionCreationFee,
  usePrepareDecentraDbCreateOrganisationAndCollectionAndAddRoles as prepareCreateOrg,
  useDecentraDbOrganisationCreatedOrUpdatedEvent as orgCreated
} from '@hooks/generated'
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Divider,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  Switch,
  FormControlLabel,
  Tooltip,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { increaseProgress } from '@utils/index'

interface Datatype {
  type: string
  value: number
}

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

  const orgFee = useDecentraDbOrgCreationFee().data
  const collectionFee = useDecentraDbCollectionCreationFee().data
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  orgCreated({
    listener: (logs) => {
      setOrgId(Number(logs[0].args.organisationId))
    }
  })

  const { config } = prepareCreateOrg({
    args: [
      orgName,
      orgInfoFields,
      orgInfoDataTypes,
      ['0'],
      collectionName,
      collectionInfoFields,
      collectionInfoDataTypes,
      collectionInfoValues,
      fieldNames,
      fieldDataTypes,
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
        <Typography variant="h3">
          What's the name of your organisation?
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Organisation Name"
          placeholder="Your organisation Name"
          onChange={(e) => {
            setOrgName(e.target.value)
          }}
          onBlur={() => {
            setProgress(increaseProgress(progress, 5))
          }}
        />
      </Box>
      <Divider />
      <Box sx={{ m: 2 }}>
        <Typography variant="h3">
          Now let's define your first collection
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Collection Name"
          placeholder="The collection Name"
          onChange={(e) => {
            setCollectionName(e.target.value)
          }}
          onBlur={() => {
            setProgress(increaseProgress(progress, 5))
          }}
          sx={{ mr: 2, mb: 2 }}
        />
        <TextField
          placeholder="Collection Description"
          label="Collection Description"
          onChange={(e) => {
            setCollectionInfoValues([e.target.value])
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
                label={'Field ' + (i + 1) + ' Name'}
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
            <FormControl sx={{ mb: 2, minWidth: 150 }}>
              <InputLabel id="select-label">Data Type</InputLabel>
              <Select
                labelId="select-input"
                id="select"
                label="Data Type"
                onChange={(e) => {
                  const currentFieldNames = Array.isArray(fieldDataTypes)
                    ? fieldDataTypes
                    : []
                  const updatedFieldTypes = [...currentFieldNames]
                  updatedFieldTypes[i] = Number(e.target.value)
                  setFieldDataTypes(updatedFieldTypes)
                }}
                onBlur={() => {
                  setProgress(increaseProgress(progress, 5))
                }}
              >
                {datatypes.map((datatype: Datatype) => (
                  <MenuItem value={datatype.value}>{datatype.type}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
        <Typography variant="h3">
          Can anyone publish in this collection?
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={
            addPublishers
              ? 'Only approved addresses can publish'
              : 'Anyone can publish within this collection'
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
