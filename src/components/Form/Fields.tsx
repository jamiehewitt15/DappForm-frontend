import { ReactElement } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  IconButton,
  Tooltip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InputTypeSelect from '@components/Form/InputTypeSelect'

interface FieldsProps {
  fields: string[]
  setFields: (fields: string[]) => void
  fieldNames: string[]
  setFieldNames: (names: string[]) => void
  fieldDataTypes: number[]
  setFieldDataTypes: (types: number[]) => void
}

export default function Fields(props: FieldsProps): ReactElement {
  const handleRemoveField = (index: number) => {
    props.setFields(props.fields.filter((_, i) => i !== index))
    props.setFieldNames(props.fieldNames.filter((_, i) => i !== index))
    props.setFieldDataTypes(props.fieldDataTypes.filter((_, i) => i !== index))
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        {props.fields.map((field, i) => (
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
            <Tooltip title="Delete this field from your schema">
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => handleRemoveField(i)}
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
          onClick={() =>
            props.setFields([
              ...props.fields,
              `field-${props.fields.length + 1}`
            ])
          }
        >
          Add an extra field
        </Button>
      </Box>
    </>
  )
}
