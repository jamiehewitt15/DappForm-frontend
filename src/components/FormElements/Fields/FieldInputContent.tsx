import { ReactElement, ChangeEvent } from 'react'
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  Switch,
  FormGroup,
  FormControlLabel,
  CardContent,
  Divider
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import InputTypeSelect from '@components/FormElements/InputTypeSelect'
import DynamicInput from '../DynamicInput'
import SortableCard from './SortableCard'
import { useFormContext } from '@context/FormContext'

export default function FieldInputContent({
  fieldKey,
  index
}: {
  fieldKey: string
  index: number
}): ReactElement {
  const {
    fieldNames,
    setFieldNames,
    fieldDataTypes,
    setFieldDataTypes,
    requiredFields,
    setRequiredFields,
    setFieldOptions,
    fieldOptions,
    setFieldIds
  } = useFormContext()

  const handleRemoveField = (index: number) => {
    setFieldNames(fieldNames.filter((_, i) => i !== index))
    setFieldDataTypes(fieldDataTypes.filter((_, i) => i !== index))
    setRequiredFields(requiredFields.filter((_, i) => i !== index))
    // remove field from field options array
    setFieldOptions(fieldOptions.filter((_, i) => i !== index))
    setFieldIds(fieldNames.filter((_, i) => i !== index))
  }

  const handleRequiredChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedRequiredFields = [...requiredFields]
    updatedRequiredFields[index] = event.target.checked
    setRequiredFields(updatedRequiredFields)
  }

  const handleCopyField = (index: number) => {
    // Copy the values of the field at the given index
    const fieldName = fieldNames[index]
    const fieldType = fieldDataTypes[index]
    console.log('field type', fieldType)
    const fieldRequired = requiredFields[index]
    // Directly copy the array at fieldOptions[index], which is a string[]
    const selectedFieldOptions = [...fieldOptions[index]]

    // Update the arrays with the copied values
    setFieldNames([...fieldNames, fieldName])
    setFieldDataTypes([...fieldDataTypes, fieldType])
    setRequiredFields([...requiredFields, fieldRequired])
    setFieldOptions((currentOptions) => [
      ...currentOptions,
      selectedFieldOptions
    ])
    setFieldIds((currentIds) => [
      ...currentIds,
      'field-' + currentIds.length + Math.random()
    ])
  }

  return (
    <SortableCard key={fieldKey} id={fieldKey} field={fieldKey}>
      <CardContent sx={{ pb: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <TextField
            label={'Question ' + (index + 1)}
            value={fieldNames[index] || ''}
            onChange={(e) => {
              const updatedFieldNames = [...fieldNames]
              updatedFieldNames[index] = e.target.value
              setFieldNames(updatedFieldNames)
            }}
            fullWidth
            sx={{ mr: 2 }}
          />
          <Box sx={{ minWidth: '230px' }}>
            <InputTypeSelect
              setFieldDataTypes={setFieldDataTypes}
              fieldDataTypes={fieldDataTypes}
              fieldIndex={index}
            />
          </Box>
        </Box>
        <DynamicInput index={index} />
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Tooltip title="Copy this field">
            <IconButton
              aria-label="copy"
              onClick={() => handleCopyField(index)}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this field from your form">
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveField(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, height: '36px' }}
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={requiredFields[index] || false}
                  onChange={(event) => handleRequiredChange(index, event)}
                />
              }
              label="Required"
            />
          </FormGroup>
        </Box>
      </Box>
    </SortableCard>
  )
}
