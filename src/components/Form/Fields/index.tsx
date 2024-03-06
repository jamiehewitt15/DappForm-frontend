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
  Divider
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add' // Import AddIcon
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import InputTypeSelect from '@components/Form/InputTypeSelect'
import DynamicInput from '../DynamicInput'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  verticalListSortingStrategy,
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import SortableCard from './SortableCard'
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
    setRequiredFields
  } = useFormContext()

  const handleAddField = () => {
    setFields([...fields, `field-${fields.length + 1}`])
    setRequiredFields([...requiredFields, false])
    setFieldDataTypes([...fieldDataTypes, 0])
  }

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
    setFieldNames(fieldNames.filter((_, i) => i !== index))
    setFieldDataTypes(fieldDataTypes.filter((_, i) => i !== index))
    setRequiredFields(requiredFields.filter((_, i) => i !== index))
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
    const fieldRequired = requiredFields[index]

    // Update the arrays with the copied values
    setFields([...fields, `field-${fields.length + 1}`])
    setFieldNames([...fieldNames, fieldName])
    setFieldDataTypes([...fieldDataTypes, fieldType])
    setRequiredFields([...requiredFields, fieldRequired])
  }

  function handleDragEnd(event) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fields.indexOf(active.id)
      const newIndex = fields.indexOf(over.id)

      // Update fields array
      const newFields = arrayMove(fields, oldIndex, newIndex)
      setFields(newFields)

      // Update fieldNames array
      const newFieldNames = arrayMove(fieldNames, oldIndex, newIndex)
      setFieldNames(newFieldNames)

      // Update fieldDataTypes array
      const newFieldDataTypes = arrayMove(fieldDataTypes, oldIndex, newIndex)
      setFieldDataTypes(newFieldDataTypes)

      // Update requiredFields array
      const newRequiredFields = arrayMove(requiredFields, oldIndex, newIndex)
      setRequiredFields(newRequiredFields)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field, i) => (
            <SortableCard key={field} id={field} field={field}>
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
                    value={fieldNames[i] || ''}
                    onChange={(e) => {
                      const updatedFieldNames = [...fieldNames]
                      updatedFieldNames[i] = e.target.value
                      setFieldNames(updatedFieldNames)
                    }}
                    fullWidth
                    sx={{ mr: 2 }}
                  />
                  <Box sx={{ minWidth: '230px' }}>
                    <InputTypeSelect
                      setFieldDataTypes={setFieldDataTypes}
                      fieldDataTypes={fieldDataTypes}
                      fieldIndex={i}
                    />
                  </Box>
                </Box>
                <DynamicInput typeIndex={fieldDataTypes[i]} />
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
                          checked={requiredFields[i] || false}
                          onChange={(event) => handleRequiredChange(i, event)}
                        />
                      }
                      label="Required"
                    />
                  </FormGroup>
                </Box>
              </Box>
            </SortableCard>
          ))}
        </SortableContext>
      </DndContext>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center the button on the x-axis
          my: 2 // Apply margin top and bottom for spacing
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />} // Add the icon to the button
          onClick={() => {
            handleAddField()
          }}
          sx={{
            backgroundColor: '#ffffff'
          }}
        >
          Add Question
        </Button>
      </Box>
    </>
  )
}
