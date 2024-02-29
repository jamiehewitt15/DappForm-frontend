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
  const handleAddField = () => {
    props.setFields([...props.fields, `field-${props.fields.length + 1}`])
    props.setRequiredFields([...props.requiredFields, false])
    props.setFieldDataTypes([...props.fieldDataTypes, 0])
  }

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

  function handleDragEnd(event) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = props.fields.indexOf(active.id)
      const newIndex = props.fields.indexOf(over.id)

      // Update fields array
      const newFields = arrayMove(props.fields, oldIndex, newIndex)
      props.setFields(newFields)

      // Update fieldNames array
      const newFieldNames = arrayMove(props.fieldNames, oldIndex, newIndex)
      props.setFieldNames(newFieldNames)

      // Update fieldDataTypes array
      const newFieldDataTypes = arrayMove(
        props.fieldDataTypes,
        oldIndex,
        newIndex
      )
      props.setFieldDataTypes(newFieldDataTypes)

      // Update requiredFields array
      const newRequiredFields = arrayMove(
        props.requiredFields,
        oldIndex,
        newIndex
      )
      props.setRequiredFields(newRequiredFields)
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
        <SortableContext
          items={props.fields}
          strategy={verticalListSortingStrategy}
        >
          {props.fields.map((field, i) => (
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
                    value={props.fieldNames[i] || ''}
                    onChange={(e) => {
                      const updatedFieldNames = [...props.fieldNames]
                      updatedFieldNames[i] = e.target.value
                      props.setFieldNames(updatedFieldNames)
                    }}
                    fullWidth
                    sx={{ mr: 2 }}
                  />
                  <Box sx={{ minWidth: '230px' }}>
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
