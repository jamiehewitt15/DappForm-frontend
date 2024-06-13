import { ReactElement, useEffect, useState } from 'react'
import ResponseFormHeading from '../ResponseForm/ResponseFormHeading'
import { Box, Card, CardContent, TextField } from '@mui/material'
import { useFormContext } from '@context/FormContext'
import Responses from './Responses'

export default function DiscussionForm(): ReactElement {
  const [response, setResponse] = useState<string>('')
  const { setFormResponses, collectionId } = useFormContext()

  useEffect(() => {
    setFormResponses([response, String(collectionId)])
  }, [response, collectionId, setFormResponses])

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value)
  }

  return (
    <>
      <ResponseFormHeading showRequiredMessage={false} />
      <Responses />
      <Card
        key="response"
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 1,
          borderRadius: '8px'
        }}
      >
        <CardContent sx={{ pb: 0, pt: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          ></Box>
          <TextField
            label="Response"
            fullWidth
            multiline
            rows={4}
            onChange={handleResponseChange}
            value={response}
          />
        </CardContent>
      </Card>
    </>
  )
}
