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
import DynamicInput from '@components/FormElements/DynamicInput'

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
          <CardContent sx={{ pb: 0, pt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Typography variant="body1">
                {fetchingData ? <Skeleton width={600} /> : fieldNames[i]}
              </Typography>
            </Box>
            <DynamicInput index={0} deactivated={false} />
          </CardContent>
        </div>
      ))}
    </>
  )
}
