import { ReactElement } from 'react'
import ResponseFormHeading from '../ResponseForm/ResponseFormHeading'
import { Box, Card, CardContent, Typography, TextField } from '@mui/material'

export default function Form(): ReactElement {
  return (
    <>
      <ResponseFormHeading showRequiredMessage={false} />
      <Card
        key="respnse"
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
          <TextField label="Response" fullWidth multiline rows={4} />
        </CardContent>
      </Card>
    </>
  )
}
