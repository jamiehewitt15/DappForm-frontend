import Calendly from '@components/shared/Calendly'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export default function CallToAction() {
  const items = ['Open source', 'Low cost', 'Easy to use']

  return (
    <Box>
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
    </Box>
  )
}
