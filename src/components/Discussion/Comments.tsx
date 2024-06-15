import { ReactElement } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function CommentsList({
  comments
}: {
  comments: any[]
}): ReactElement {
  if (!comments || comments?.length === 0) {
    return (
      <Box>
        <Typography>No comments yet.</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {comments.map((comment) => (
        <Card
          key={comment.id}
          sx={{
            borderRadius: '8px',
            marginBottom: '10px'
          }}
        >
          <CardContent>
            <Typography variant="body2">{comment.fieldValues[0]}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
