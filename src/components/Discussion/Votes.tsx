// Votes.tsx
import { useState, ReactElement } from 'react'
import { Box, IconButton, Typography, Divider } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export default function Votes(): ReactElement {
  const [upvotes, setUpvotes] = useState(10)
  const [downvotes, setDownvotes] = useState(2)

  const handleUpvote = () => {
    setUpvotes(upvotes + 1)
  }

  const handleDownvote = () => {
    setDownvotes(downvotes + 1)
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      border={1}
      borderColor="primary.main"
      borderRadius="50px"
      padding="0 8px"
      gap={1}
      bgcolor="transparent"
    >
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="body1">{upvotes}</Typography>
        <IconButton onClick={handleUpvote} color="primary">
          <ArrowUpwardIcon />
        </IconButton>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="body1">{downvotes}</Typography>
        <IconButton onClick={handleDownvote} color="secondary">
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
