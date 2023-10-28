import { useState, useEffect, ReactElement } from 'react'
import {
  collectionInfoFields,
  collectionInfoDataTypes
} from '@constants/InfoConstants'
import datatypes from '@constants/datatypes.json'
import { paramToInt, increaseProgress } from '@utils/index'
import {
  useDecentraDbCollectionCreationFee,
  usePrepareDecentraDbCreateOrUpdateCollection as prepareCreateCollection,
  useDecentraDbCollectionCreatedOrUpdatedEvent as collectionCreated
} from '@hooks/generated'
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import Form from '@components/Form/Form'

interface Datatype {
  type: string
  value: number
}

export default function Onboarding(): ReactElement {
  const router = useRouter()
  const [progress, setProgress] = useState<number>(0)
  const [fields, setFields] = useState<string[]>(['field-1'])
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>()
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [orgId, setOrgId] = useState<number>()
  const [collectionId, setCollectionId] = useState<number>()

  useEffect(() => {
    if (router.isReady && router.query.organisationId) {
      const hexOrgId = paramToInt(router.query.organisationId)
      setOrgId(hexOrgId)
    }
  }, [router.query.organisationId])

  const fee = useDecentraDbCollectionCreationFee().data

  collectionCreated({
    listener: (logs) => {
      setCollectionId(Number(logs[0].args.collectionId))
    }
  })

  const { config } = prepareCreateCollection({
    args: [
      0,
      orgId,
      collectionName,
      collectionInfoFields,
      collectionInfoDataTypes,
      collectionInfoValues,
      fieldNames,
      fieldDataTypes,
      false,
      false
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
      successPath={`/collection/${orgId}/${collectionId}`}
      config={config}
    >
      <Box sx={{ m: 2 }}>
        <Typography variant="h3">Let's define your new collection</Typography>
        <TextField
          required
          id="outlined-required"
          label="Collection Name"
          placeholder="The collection Name"
          onChange={(e) => {
            setCollectionName(e.target.value)
          }}
          onBlur={() => {
            setProgress(increaseProgress(progress, 4))
          }}
          sx={{ mr: 4, mb: 2 }}
        />
        <TextField
          placeholder="Collection Description"
          label="Collection Description"
          onChange={(e) => {
            setCollectionInfoValues([e.target.value])
          }}
          onBlur={() => {
            setProgress(increaseProgress(progress, 4))
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
                  setProgress(increaseProgress(progress, 4))
                }}
                sx={{ mr: 4 }}
              />
            </FormControl>
            <FormControl sx={{ mb: 2, minWidth: 180 }}>
              <InputLabel id="select-label">Field {i + 1} Data Type</InputLabel>
              <Select
                labelId="select-input"
                id="select"
                label="Field x  Data Type"
                onChange={(e) => {
                  const currentFieldNames = Array.isArray(fieldDataTypes)
                    ? fieldDataTypes
                    : []
                  const updatedFieldTypes = [...currentFieldNames]
                  updatedFieldTypes[i] = Number(e.target.value)
                  setFieldDataTypes(updatedFieldTypes)
                }}
                onBlur={() => {
                  setProgress(increaseProgress(progress, 4))
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
    </Form>
  )
}
