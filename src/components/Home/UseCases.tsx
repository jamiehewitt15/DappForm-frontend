import React from 'react'
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material'
import styles from './useCases.module.css'

export default function UseCases() {
  // Array of card details
  const cards = [
    {
      title: 'Carbon Credits',
      content:
        'The value of carbon credits depends on their origin. If people don’t trust their origin the value is greatly diminished. Tracking carbon credits on the blockchain gives everyone full insight into the providence of the carbon credit. A truly open and transparent carbon credit has more value. '
    },
    {
      title: 'Supply Chain',
      content:
        'Consumers want products where farmers have been fairly paid. Using blockchain to trace the origin of your products gives full insight into every step of the supply chain. This gives your customers full confidence in your brand and increases the value of your products.'
    },
    {
      title: 'Government',
      content:
        'There is a direct relationship between the scrutiny on a government and the quality of services it delivers. By making data permanently available on the blockchain it ensures the government is efficiently held to account by all stakeholders. Ensuring better outcomes for all.'
    }
  ]
  return (
    <Box mb={8}>
      <Typography variant="h1" align="center">
        Use Cases
      </Typography>
      <br />
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h2" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
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
