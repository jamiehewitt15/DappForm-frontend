import React, { useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import PaletteIcon from '@mui/icons-material/Palette'
import {
  Box,
  IconButton,
  SvgIcon,
  Typography,
  Drawer,
  Divider,
  Stack,
  Button,
  Tooltip
} from '@mui/material'
import { lightenColor } from '@utils/backgroundColor'
import FontSelector from './FontSelector'

type ColorOption = {
  hex: string
  label: string
}

type ThemePickerProps = {
  color: string
  changeColor: (color: string) => void
  backgroundColor: string
  changeBackgroundColor: (color: string) => void
  showText?: boolean
}

export default function ThemePicker({
  color,
  changeColor,
  backgroundColor,
  changeBackgroundColor,
  showText = false
}: ThemePickerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [colorOptions, setColorOptions] = useState<ColorOption[]>([
    { hex: '#ffffff', label: 'White' },
    { hex: '#f6f6f6', label: 'Grey' }
  ])

  useEffect(() => {
    if (color === '#ffffff') {
      changeBackgroundColor('#f6f6f6')
      setColorOptions([
        { hex: '#ffffff', label: 'White' },
        { hex: '#f6f6f6', label: 'Grey' }
      ])
    } else {
      changeBackgroundColor(lightenColor(color, 0.8))
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Change styling">
          <IconButton onClick={handleDrawerOpen}>
            <PaletteIcon sx={{ width: 30, height: 30, marginRight: '10px' }} />
          </IconButton>
        </Tooltip>
        {showText && (
          <Button
            onClick={handleDrawerOpen}
            sx={{ textTransform: 'none', marginLeft: '-8px', color: 'inherit' }}
          >
            <Typography variant="body1">Styling</Typography>
          </Button>
        )}
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ p: 3 }}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
          <Stack spacing={2}>
            <div style={{ width: 'auto', padding: '20px' }}>
              <FontSelector />
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Typography variant="h6">Choose Color:</Typography>
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
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Typography variant="h6">Choose Background:</Typography>
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
          </Stack>
        </Box>
      </Drawer>
    </div>
  )
}
