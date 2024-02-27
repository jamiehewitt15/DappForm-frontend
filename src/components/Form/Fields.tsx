import { ReactElement, ChangeEvent } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  IconButton,
  Tooltip,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Card,
  CardContent
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import InputTypeSelect from '@components/Form/InputTypeSelect'

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
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <div key={field}>
                <FormControl sx={{ mb: 2, minWidth: 180 }}>
                  <TextField
                    label={'Question ' + (i + 1)}
                    value={props.fieldNames[i] || ''}
                    onChange={(e) => {
                      const updatedFieldNames = [...props.fieldNames]
                      updatedFieldNames[i] = e.target.value
                      props.setFieldNames(updatedFieldNames)
                    }}
                    sx={{ mr: 2 }}
                  />
                </FormControl>
                <InputTypeSelect
                  setFieldDataTypes={props.setFieldDataTypes}
                  fieldDataTypes={props.fieldDataTypes}
                  fieldIndex={i}
                />
                <Tooltip title="Delete this field from your form">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleRemoveField(i)}
                  >
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Copy this field">
                  <IconButton
                    aria-label="copy"
                    size="large"
                    onClick={() => handleCopyField(i)}
                  >
                    <ContentCopyIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.requiredFields[i] || false}
                        onChange={(event) => handleRequiredChange(i, event)}
                      />
                    }
                    label="Required"
                  />
                </FormGroup>
              </div>
            </CardContent>
          </Card>
        ))}
        <br />
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
