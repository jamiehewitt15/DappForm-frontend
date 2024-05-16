import { Box, Typography, Card, Grid } from '@mui/material'
import StarList from '@components/shared/StarList'
import Image from 'next/image'

export default function CallToAction() {
  const items = [
    'Forms that store data on the blockchain.',
    'Define the datatype for each field on your form.',
    'Set roles - who is allowed to add & edit data.',
    'Track the history of all data in your database.'
  ]

  return (
    <Card
      sx={{
        m: {
          xs: 2, // Margin for mobile devices
          sm: 4, // Margin for tablets
          md: 6 // Margin for larger screens
        },
        p: {
          xs: 2, // Padding for mobile devices
          sm: 4, // Padding for tablets
          md: 5 // Padding for larger screens
        }
      }}
    >
      <Typography
        variant="h4" // Smaller variant for mobile devices
        align="center"
        sx={{
          m: {
            xs: 2, // Margin for mobile devices
            sm: 3, // Margin for tablets
            md: 4 // Margin for larger screens
          },
          mb: {
            xs: 4, // Margin bottom for mobile devices
            sm: 6, // Margin bottom for tablets
            md: 8 // Margin bottom for larger screens
          },
          fontSize: {
            xs: '1.5rem', // Font size for mobile devices
            sm: '2rem', // Font size for tablets
            md: '2.5rem' // Font size for larger screens
          }
        }}
      >
        Features
      </Typography>
      <Box display="flex" justifyContent="center">
        <StarList items={items} />
      </Box>
    </Card>
  )
}
