import Calendly from '@components/shared/CalendlyWithArrow'
import { Box, Typography, Card } from '@mui/material'
import StarList from '@components/shared/StarList'

export default function CallToAction() {
  const items = [
    'Easiest and cheapest way to use the Blockchain',
    'Data is transparent, verifiable, and auditable.',
    'Open source. Our code is free to use.'
  ]

  return (
    // add an m margin to the Card component
    <Card sx={{ m: 10, p: 4 }}>
      <Typography variant="h1" align="center">
        Why TransparencyBase?
      </Typography>
      <Box display="flex" justifyContent="center">
        <StarList items={items} />
      </Box>
      <Calendly />
    </Card>
  )
}
