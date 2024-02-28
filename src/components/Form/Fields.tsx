import { ReactElement, ChangeEvent } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  IconButton,
  Tooltip,
  Switch,
  FormGroup,
  FormControlLabel,
  Card,
  CardContent,
  Divider
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import InputTypeSelect from '@components/Form/InputTypeSelect'
import DynamicInput from './DynamicInput'

interface FieldsProps {
  fields: string[]
  setFields: (fields: string[]) => void
  fieldNames: string[]
  setFieldNames: (names: string[]) => void
  fieldDataTypes: number[]
  setFieldDataTypes: (types: number[]) => void
  requiredFields: boolean[]
  setRequiredFields: (required: boolean[]) => void
}

export default function Fields(props: FieldsProps): ReactElement {
  const handleRemoveField = (index: number) => {
    props.setFields(props.fields.filter((_, i) => i !== index))
    props.setFieldNames(props.fieldNames.filter((_, i) => i !== index))
    props.setFieldDataTypes(props.fieldDataTypes.filter((_, i) => i !== index))
    props.setRequiredFields(props.requiredFields.filter((_, i) => i !== index))
  }

  const handleRequiredChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedRequiredFields = [...props.requiredFields]
    updatedRequiredFields[index] = event.target.checked
    props.setRequiredFields(updatedRequiredFields)
  }

  const handleCopyField = (index: number) => {
    // Copy the values of the field at the given index
    const fieldName = props.fieldNames[index]
    const fieldType = props.fieldDataTypes[index]
    const fieldRequired = props.requiredFields[index]

    // Update the arrays with the copied values
    props.setFields([...props.fields, `field-${props.fields.length + 1}`])
    props.setFieldNames([...props.fieldNames, fieldName])
    props.setFieldDataTypes([...props.fieldDataTypes, fieldType])
    props.setRequiredFields([...props.requiredFields, fieldRequired])
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        {props.fields.map((field, i) => (
          <Card
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            key={field}
          >
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
                  label={'Question ' + (i + 1)}
                  value={props.fieldNames[i] || ''}
                  onChange={(e) => {
                    const updatedFieldNames = [...props.fieldNames]
                    updatedFieldNames[i] = e.target.value
                    props.setFieldNames(updatedFieldNames)
                  }}
                  fullWidth
                  sx={{ mr: 2 }}
                />
                <Box sx={{ minWidth: '200px' }}>
                  <InputTypeSelect
                    setFieldDataTypes={props.setFieldDataTypes}
                    fieldDataTypes={props.fieldDataTypes}
                    fieldIndex={i}
                  />
                </Box>
              </Box>
              <DynamicInput typeIndex={props.fieldDataTypes[i]} />
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
                    onClick={() => handleCopyField(i)}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete this field from your form">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveField(i)}
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
                        checked={props.requiredFields[i] || false}
                        onChange={(event) => handleRequiredChange(i, event)}
                      />
                    }
                    label="Required"
                  />
                </FormGroup>
              </Box>
            </Box>
          </Card>
        ))}
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            props.setFields([
              ...props.fields,
              `field-${props.fields.length + 1}`
            ])
            props.setRequiredFields([...props.requiredFields, false])
          }}
        >
          Add an extra field
        </Button>
      </Box>
    </>
  )
}
