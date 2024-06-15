import { ReactElement } from 'react'
import { Box, CardContent, Typography } from '@mui/material'
import ResponseFooter from './ResponseFooter'

export default function CommentsList({
  comments
}: {
  comments: any[]
}): ReactElement {
  if (!comments || comments?.length === 0) {
    return (
      <Box
        sx={{
          marginBottom: '20px',
          marginTop: '40px'
        }}
      >
        <Typography>No comments yet.</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        marginTop: '40px'
      }}
    >
      {comments.map((comment) => (
        <Box
          key={comment.id}
          sx={{
            padding: '10px',
            marginBottom: '20px',
            marginTop: '20px',
            borderRadius: '8px',
            border: '1px solid #E0E0E0'
          }}
        >
          <Typography variant="body2">{comment.fieldValues[0]}</Typography>
          <ResponseFooter
            address={comment.transactionFrom}
            blockTimestamp={comment.blockTimestamp}
          />
        </Box>
      ))}
    </Box>
  )
}
