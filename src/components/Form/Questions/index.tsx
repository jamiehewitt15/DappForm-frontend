import { ReactElement, ChangeEvent } from 'react'
import {
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Switch,
  FormGroup,
  FormControlLabel,
  CardContent,
  Divider,
  Typography,
  Skeleton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add' // Import AddIcon
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import InputTypeSelect from '@components/FormElements/InputTypeSelect'
import { useFormContext } from '@context/FormContext'

export default function Fields(): ReactElement {
  const {
    fields,
    setFields,
    fieldNames,
    setFieldNames,
    fieldDataTypes,
    setFieldDataTypes,
    requiredFields,
    setRequiredFields,
    fieldOptions,
    setFieldOptions,
    fetchingData
  } = useFormContext()

  return (
    <>
      {fields.map((field, i) => (
        <div key={field} id={field}>
          <CardContent sx={{ pb: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              {fetchingData ? <Skeleton width={600} /> : fieldNames[i]}
              {/* <TextField
                label={'Question ' + (i + 1)}
                value={fieldNames[i] || ''}
                onChange={(e) => {
                  const updatedFieldNames = [...fieldNames]
                  updatedFieldNames[i] = e.target.value
                  setFieldNames(updatedFieldNames)
                }}
                fullWidth
                sx={{ mr: 2 }}
              /> */}
              <Box sx={{ minWidth: '230px' }}>
                <InputTypeSelect
                  setFieldDataTypes={setFieldDataTypes}
                  fieldDataTypes={fieldDataTypes}
                  fieldIndex={i}
                />
              </Box>
            </Box>
          </CardContent>
        </div>
      ))}
    </>
  )
}
