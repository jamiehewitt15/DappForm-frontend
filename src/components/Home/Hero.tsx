import React from 'react'
import { Box, Typography, Button, Link } from '@mui/material'
import styles from './heroStyles.module.css'
import Calendly from '@components/shared/CalendlyWithArrow'
import Image from 'next/image'

export default function Hero() {
  return (
    <Box className={styles.heroContainer}>
      <Typography variant="h1" align="center">
        Create forms on the blockchain
      </Typography>
      <Box className={styles.heroText}>
        <Typography variant="h2" component="h1">
          More transparency. More credibility.
        </Typography>
        <br />
        <Typography variant="h3" component="h1">
          Make data permanently available for anyone to analyse.
          <br />
          Openness earns trust.
        </Typography>
        <Calendly />
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
          {/* <Link
            href="https://thegraph.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/TheGraph.svg"
              alt="The Graph Logo"
              width={100}
              height={100} // Adjust the height as needed to maintain the aspect ratio
            />
          </Link> */}
        </Box>
      </Box>
    </Box>
  )
}
