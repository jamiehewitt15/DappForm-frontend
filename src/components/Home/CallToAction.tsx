import { Box, Typography, Card, Button } from '@mui/material'
import StarList from '@components/shared/StarList'

export default function CallToAction() {
  const items = [
    'Open source 🌟',
    'No email sign up. Just connect your wallet 🔒',
    'No fiat. Just gas fees 🚫💵',
    'All data stored in a smart contract on Polygon 📜'
  ]

  return (
    <Card
      sx={{
        m: {
          xs: 2, // Margin for mobile devices
          sm: 4, // Margin for tablets
          md: 8, // Margin for larger screens
          lg: 28 // Larger margin for desktop
        },
        p: {
          xs: 2, // Padding for mobile devices
          sm: 3, // Padding for tablets
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
        Why AltBase?
      </Typography>
      <Box display="flex" justifyContent="center">
        <StarList items={items} />
      </Box>
      <br />
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/start/0"
          sx={{
            fontSize: {
              xs: '0.875rem', // Font size for mobile devices
              sm: '1rem', // Font size for tablets
              md: '1.125rem' // Font size for larger screens
            },
            padding: {
              xs: '0.5rem 1rem', // Padding for mobile devices
              sm: '0.75rem 1.5rem', // Padding for tablets
              md: '1rem 2rem' // Padding for larger screens
            }
          }}
        >
          Start
        </Button>
      </Box>
    </Card>
  )
}
