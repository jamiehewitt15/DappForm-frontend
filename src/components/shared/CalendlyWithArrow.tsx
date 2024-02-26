'use client'

import { Box } from '@mui/material'
import Image from 'next/image'
import Calendly from './Calendly'

export default function CalendlyWithArrow() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="/arrow.png"
        width={50}
        height={85}
        alt="Picture of a curved arrow"
        style={{ display: 'block', marginBottom: '1rem' }} // Added margin for spacing
      />
      <Calendly />
    </Box>
  )
}
