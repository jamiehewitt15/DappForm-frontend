import { ReactElement, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add' // Import AddIcon
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
import { useFormContext } from '@context/FormContext'
import FieldInputContent from './FieldInputContent'

export default function Fields(): ReactElement {
  const [fieldIds, setFieldIds] = useState(['field-1'])
  const {
    fieldNames,
    setFieldNames,
    fieldDataTypes,
    setFieldDataTypes,
    requiredFields,
    setRequiredFields,
    fieldOptions,
    setFieldOptions
  } = useFormContext()

  useEffect(() => {
    // add a new field ID for every new field
    if (fieldNames.length > fieldIds.length) {
      setFieldIds(fieldNames.map((_, i) => `field-${i + 1}`))
    }
  }, [fieldNames])

  const handleAddField = () => {
    setRequiredFields([...requiredFields, false])
    setFieldDataTypes([...fieldDataTypes, 0])
    setFieldOptions([...fieldOptions, []])
    setFieldNames([...fieldNames, ''])
    setFieldOptions([...fieldOptions, ['']])
  }

  function handleDragEnd(event) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fieldIds.indexOf(active.id)
      const newIndex = fieldIds.indexOf(over.id)

      // Update fieldNames array
      const newFieldNames = arrayMove(fieldNames, oldIndex, newIndex)
      setFieldNames(newFieldNames)

      // Update fieldDataTypes array
      const newFieldDataTypes = arrayMove(fieldDataTypes, oldIndex, newIndex)
      setFieldDataTypes(newFieldDataTypes)

      // Update requiredFields array
      const newRequiredFields = arrayMove(requiredFields, oldIndex, newIndex)
      setRequiredFields(newRequiredFields)

      // Update fieldOptions array
      const newFieldOptions = arrayMove(fieldOptions, oldIndex, newIndex)
      setFieldOptions(newFieldOptions)

      // Update fieldIds array
      const newFieldIds = arrayMove(fieldIds, oldIndex, newIndex)
      setFieldIds(newFieldIds)
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
          items={fieldIds}
          strategy={verticalListSortingStrategy}
        >
          {fieldIds.map((field, i) => (
            <FieldInputContent fieldKey={field} index={i} />
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
        {fieldNames.length > 0 && (
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
        )}
      </Box>
    </>
  )
}
