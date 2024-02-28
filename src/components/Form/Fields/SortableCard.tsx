import { CSSProperties } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, Box } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'

export default function SortableCard(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Use ternary to ensure zIndex is a number or not set
    ...(isDragging ? { zIndex: 1000, position: 'relative' as const } : {})
  }

  return (
    <Card
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isDragging ? 3 : 1
      }}
      key={props.field}
      ref={setNodeRef}
      style={style} // Apply the style here to move the entire Card
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center the icon on the x-axis
          cursor: 'grab'
        }}
        {...listeners} // Apply listeners to just the drag handle
        {...attributes} // Apply attributes to just the drag handle
      >
        <DragHandleIcon />
      </Box>
      {props.children}
    </Card>
  )
}
