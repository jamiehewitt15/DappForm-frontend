import Calendly from '@components/shared/CalendlyWithArrow'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Card
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export default function CallToAction() {
  const items = [
    'Data is transparent, verifiable, and auditable.',
    'Low cost and easy to use.',
    'Open source. Our code is free to use.'
  ]

  return (
    // add an m margin to the Card component
    <Card sx={{ m: 10, p: 4 }}>
      <Typography variant="h1" align="center">
        Why TransparencyBase?
      </Typography>
      <Box display="flex" justifyContent="center">
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h3">{item}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Calendly />
    </Card>
  )
}
