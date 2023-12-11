// CustomList.jsx
import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export default function StarList({ items }) {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <StarIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="h3">{item}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  )
}
