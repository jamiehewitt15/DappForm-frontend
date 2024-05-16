import Calendly from '@components/shared/CalendlyWithArrow'
import { Box, Typography, Card, Button } from '@mui/material'
import StarList from '@components/shared/StarList'

export default function CallToAction() {
  const items = [
    'Easiest and cheapest way to save data on the Blockchain',
    'Data is transparent, verifiable, and auditable.',
    'Open source. Our code is free to use.'
  ]

  return (
    // add an m margin to the Card component
    <Card sx={{ m: 28, p: 5 }}>
      <Typography variant="h1" align="center" sx={{ m: 4, mb: 8 }}>
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
        >
          Start
        </Button>
      </Box>
    </Card>
  )
}
