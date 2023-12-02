'use client'

import { useEffect } from 'react'
import { Button } from '@mui/material'

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
    <Button href="#" variant="contained" size="large" onClick={handleClick}>
      Book a Demo
    </Button>
  )
}
