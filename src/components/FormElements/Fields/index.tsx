import { ReactElement, useEffect } from 'react'
import { Box, Button, Card } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
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
import DeviceRender from '@components/shared/DeviceRender'
import SortableCard from './SortableCard'

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

  useEffect(() => {
    if (fieldNames.length !== fieldIds.length) {
      setFieldIds(fieldNames.map((_, i) => 'field-' + i + Math.random()))
    }
  }, [fieldNames])

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
        <DeviceRender devices={['desktop']}>
          <SortableContext
            items={fieldIds.filter(Boolean)} // Filter out any falsey values
            strategy={verticalListSortingStrategy}
          >
            {fieldIds.filter(Boolean).map((field, i) => (
              <SortableCard key={field} id={field} field={i}>
                <FieldInputContent key={field} index={i} />
              </SortableCard>
            ))}
          </SortableContext>
        </DeviceRender>
        <DeviceRender devices={['phone', 'tablet']}>
          {fieldIds.map((field, i) => (
            <Card
              key={i}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 1,
                borderRadius: '8px'
              }}
            >
              <FieldInputContent key={field} index={i} />
            </Card>
          ))}
        </DeviceRender>
      </DndContext>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 2,
          px: 2,
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'stretch'
          }
        }}
      >
        {fieldNames.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddField}
            sx={{
              backgroundColor: '#ffffff',
              width: '100%',
              '@media (min-width: 600px)': {
                width: 'auto'
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
