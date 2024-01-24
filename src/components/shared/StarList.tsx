import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

interface StarListProps {
  items: string[]
  typographyVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
  typographyColor?: string
}

export default function StarList({
  items,
  typographyVariant = 'h3',
  typographyColor
}: StarListProps) {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <StarIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant={typographyVariant} color={typographyColor}>
                {item}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
