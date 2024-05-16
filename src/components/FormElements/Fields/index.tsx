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
  const {
    fieldNames,
    setFieldNames,
    fieldDataTypes,
    setFieldDataTypes,
    requiredFields,
    setRequiredFields,
    fieldOptions,
    setFieldOptions,
    fieldIds,
    setFieldIds
  } = useFormContext()

  const handleAddField = () => {
    setRequiredFields([...requiredFields, false])
    setFieldDataTypes([...fieldDataTypes, 0])
    setFieldOptions([...fieldOptions, []])
    setFieldNames([...fieldNames, ''])
    setFieldOptions([...fieldOptions, ['']])
    setFieldIds([...fieldIds, 'field-' + fieldIds.length + Math.random()])
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
            <FieldInputContent key={field} fieldKey={field} index={i} />
          ))}
        </SortableContext>
      </DndContext>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center the button on the x-axis
          my: 2, // Apply margin top and bottom for spacing
          px: 2, // Apply padding on the x-axis for better spacing on mobile
          '@media (max-width: 600px)': {
            flexDirection: 'column', // Stack elements vertically on small screens
            alignItems: 'stretch' // Ensure full-width on small screens
          }
        }}
      >
        {fieldNames.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />} // Add the icon to the button
            onClick={handleAddField}
            sx={{
              backgroundColor: '#ffffff',
              width: '100%', // Full width on mobile
              '@media (min-width: 600px)': {
                width: 'auto' // Auto width on larger screens
              }
            }}
          >
            Add Question
          </Button>
        )}
      </Box>
    </>
  )
}
