import React from 'react'
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material'
import styles from './useCases.module.css'

export default function UseCases() {
  // Array of card details
  const cards = [
    { title: 'Carbon Credits', content: 'Information about Carbon Credits...' },
    { title: 'Supply Chain', content: 'Details on Supply Chain Management...' },
    { title: 'Government', content: 'Government related information...' }
  ]
  return (
    <Box>
      <Typography variant="h1" align="center">
        Use Cases
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
