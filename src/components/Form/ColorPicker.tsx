import React, { useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import Drawer from '@mui/material/Drawer'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import PaletteIcon from '@mui/icons-material/Palette'
import { Box, IconButton, SvgIcon } from '@mui/material'
import { lightenColor } from '@utils/backgroundColor'

type ColorOption = {
  hex: string
  label: string
}

export default function ColorPicker({
  color,
  changeColor,
  backgroundColor,
  changeBackgroundColor
}: {
  color: string
  changeColor: (color: string) => void
  backgroundColor: string
  changeBackgroundColor: (color: string) => void
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [colorOptions, setColorOptions] = useState<ColorOption[]>([
    { hex: '#ffffff', label: 'White' },
    { hex: '#f6f6f6', label: 'Grey' }
  ])

  useEffect(() => {
    if (color === '#ffffff') {
      setColorOptions([
        { hex: '#ffffff', label: 'White' },
        { hex: '#f6f6f6', label: 'Grey' }
      ])
    } else {
      setColorOptions([
        { hex: lightenColor(color, 0.7), label: 'Red' },
        { hex: lightenColor(color, 0.8), label: 'Green' },
        { hex: lightenColor(color, 0.95), label: 'Blue' },
        { hex: '#f6f6f6', label: 'Grey' }
      ])
    }
  }, [color])

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div>
      <IconButton onClick={handleDrawerOpen}>
        <PaletteIcon sx={{ width: 30, height: 30, marginRight: '10px' }} />
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 'auto', padding: '20px' }}>
          <h4>Choose Color:</h4>
          <HexColorPicker color={color} onChange={changeColor} />
          #<HexColorInput color={color} onChange={changeColor} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '10px'
            }}
          >
            <p style={{ margin: 0 }}>Selected Color:</p>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: color,
                border: '1px solid #5A5A5A' // Adds a border to make the circle more visible
              }}
            ></div>
          </div>
          <h4>Choose Background:</h4>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {colorOptions.map((option) => (
              <IconButton
                key={option.label}
                onClick={() => changeBackgroundColor(option.hex)}
                sx={{
                  position: 'relative',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: option.hex,
                  '&:hover': {
                    backgroundColor: option.hex
                  },
                  border: '1px solid #5A5A5A' // Adds a border to make the circle more visible
                }}
              >
                {backgroundColor === option.hex && (
                  <SvgIcon
                    sx={{
                      color: 'black', // Adjust color based on what looks good with your color choices
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <CheckIcon />
                  </SvgIcon>
                )}
              </IconButton>
            ))}
          </Box>
        </div>
      </Drawer>
    </div>
  )
}
