import React from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  IconButton
} from '@mui/material'
import { ThumbUp } from '@mui/icons-material'

// Example data
const discussion = {
  question: 'What is your favorite programming language and why?',
  responses: [
    {
      id: 1,
      text: 'I love TypeScript because it adds type safety to JavaScript.',
      likes: 10,
      comments: [
        {
          id: 1,
          text: 'I agree, TypeScript has made my code much more maintainable.'
        },
        {
          id: 2,
          text: 'The autocomplete and error-checking features are a lifesaver.'
        }
      ]
    },
    {
      id: 2,
      text: 'Python is my favorite because of its simplicity and readability.',
      likes: 7,
      comments: [
        {
          id: 1,
          text: "Python's vast library support is also a huge advantage."
        }
      ]
    }
  ]
}

// Components
const Comment = ({ text }) => (
  <Box sx={{ ml: 4, mb: 1 }}>
    <Paper sx={{ p: 2 }}>
      <Typography>{text}</Typography>
    </Paper>
  </Box>
)

const Response = ({ text, likes, comments }) => (
  <Box sx={{ mb: 2 }}>
    <Paper sx={{ p: 2 }}>
      <Typography>{text}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <IconButton size="small" color="primary">
          <ThumbUp />
        </IconButton>
        <Typography variant="body2">{likes}</Typography>
      </Box>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <Comment text={comment.text} />
          </ListItem>
        ))}
      </List>
    </Paper>
  </Box>
)

const DiscussionBoard = () => (
  <Container>
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">{discussion.question}</Typography>
      </Paper>
      <List>
        {discussion.responses.map((response) => (
          <ListItem key={response.id}>
            <Response
              text={response.text}
              likes={response.likes}
              comments={response.comments}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Container>
)

export default DiscussionBoard
