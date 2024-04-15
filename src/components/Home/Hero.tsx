import React from 'react'
import { Box, Typography, Link, Button } from '@mui/material'
import styles from './heroStyles.module.css'
import Image from 'next/image'

export default function Hero() {
  return (
    <Box className={styles.heroContainer}>
      <Typography variant="h1" align="center">
        Create forms on-chain
      </Typography>
      <Box className={styles.heroText}>
        <Typography variant="h2" component="h1">
          More transparency. More credibility.
        </Typography>
        <br />
        <Typography variant="h3" component="h1">
          No more Google Forms.
          <br />
          Transparency earns trust.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/start/0"
        >
          Start
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="body1" component="h2">
          Running on:
        </Typography>
        <Box display="flex" justifyContent="center" mt={-2}>
          <Link
            href="https://polygon.technology/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/Polygon.svg"
              alt="Polygon Logo"
              width={150}
              height={100} // Adjust the height as needed to maintain the aspect ratio
            />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
