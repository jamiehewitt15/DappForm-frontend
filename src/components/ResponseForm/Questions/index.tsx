import { ReactElement } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { useFormContext } from '@context/FormContext'
import DynamicInput from '@components/FormElements/DynamicInput'

export default function Fields(): ReactElement {
  const { fieldNames, requiredFields } = useFormContext()

  return (
    <>
      {fieldNames.map((field, i) => (
        <Card
          key={field}
          id={field}
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 1,
            borderRadius: '8px'
          }}
        >
          <CardContent sx={{ pb: 0, pt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Typography variant="body1">
                {field}
                {requiredFields[i] && <span style={{ color: 'red' }}> *</span>}
              </Typography>
            </Box>
            <DynamicInput index={i} deactivated={false} />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
