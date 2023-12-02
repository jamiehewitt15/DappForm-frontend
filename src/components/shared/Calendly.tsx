'use client'

import { useEffect } from 'react'
import { Button, Box } from '@mui/material'
import Image from 'next/image'

export default function CalendlyWidget() {
  useEffect(() => {
    // Function to load a script
    const loadScript = (src: string, id: string) => {
      if (document.getElementById(id)) {
        return
      }
      const script = document.createElement('script')
      script.src = src
      script.id = id
      script.async = true
      document.body.appendChild(script)
    }

    // Load Calendly script
    loadScript(
      'https://assets.calendly.com/assets/external/widget.js',
      'calendly-script'
    )

    // Load Calendly CSS
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Cleanup
    return () => {
      // Remove script and stylesheet
      const script = document.getElementById('calendly-script')
      if (script) document.body.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  // Event handler for the link
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    ;(window as any).Calendly.initPopupWidget({
      url: 'https://calendly.com/transparencybase/transparencybase-demo'
    })
  }

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
      <Button
        href="#"
        variant="contained"
        size="large"
        onClick={handleClick}
        style={{ display: 'block' }} // Changed to display block
      >
        Book a Demo
      </Button>
    </Box>
  )
}
