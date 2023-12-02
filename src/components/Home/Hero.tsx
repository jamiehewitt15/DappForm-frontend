import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import styles from './heroStyles.module.css'
import Calendly from '@components/shared/CalendlyWithArrow'

export default function Hero() {
  return (
    <Box className={styles.heroContainer}>
      <Typography variant="h1" align="center">
        More transparency. More credibility.
      </Typography>
      <Box className={styles.heroText}>
        <Typography variant="h2" component="h1">
          TransparencyBase is a database on the blockchain.
        </Typography>
        <br />
        <Typography variant="h3" component="h1">
          Data is permanently available anyone to analyse. <br />
          Openness earns trust.
        </Typography>
        <Calendly />
      </Box>
    </Box>
  )
}
// Let's increase transparency and earn trust.
