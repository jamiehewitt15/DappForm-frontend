import { ReactElement, useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Backdrop,
  TextField
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Votes from './Votes'
import { useFormContext } from '@context/FormContext'
import Submit from '@components/FormElements/Submit'
import { useSubmit } from '@context/SubmitContext'
import Comments from './Comments'
import ResponseFooter from './ResponseFooter'

export default function ResponseDetails({
  open,
  onClose,
  content,
  comments
}: {
  open: boolean
  onClose: () => void
  content: any
  comments: any
}): ReactElement {
  const [response, setResponse] = useState<string>('')
  const { setFormResponses } = useFormContext()
  const { write, isLoading, isPending, isIndexing, isSuccess } = useSubmit()

  useEffect(() => {
    setFormResponses([response, String(content?.id)])
  }, [response, setFormResponses, content?.id])

  useEffect(() => {
    isSuccess && setResponse('')
  }, [isSuccess])

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value)
  }

  if (!open) return null

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Card
        sx={{
          position: 'relative',
          width: '80%',
          maxWidth: '950px',
          borderRadius: '8px',
          backgroundColor: 'white',
          padding: '25px',
          maxHeight: '95vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <CardContent
          sx={{
            flex: 1,
            overflowY: 'auto',
            marginTop: '25px'
          }}
        >
          <Box
            sx={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid #E0E0E0'
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="body2">
                  {content.fieldValues[0]}
                </Typography>
              </Box>
              <Votes documentId={content.id} />
            </Box>
            <ResponseFooter
              address={content.transactionFrom}
              blockTimestamp={content.blockTimestamp}
            />
          </Box>

          <Comments comments={comments} />
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={2}
            onChange={handleResponseChange}
            value={response}
            sx={{ marginTop: '30px' }}
          />
          <Submit
            write={write}
            isLoading={isLoading}
            isPending={isPending}
            isIndexing={isIndexing}
            buttonText="Submit Comment"
          />
        </CardContent>
      </Card>
    </Backdrop>
  )
}
