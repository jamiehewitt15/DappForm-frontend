import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import { HexColorPicker } from 'react-colorful'
import PaletteIcon from '@mui/icons-material/Palette'

export default function ColorPicker({
  color,
  changeColor
}: {
  color: string
  changeColor: (color: string) => void
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div>
      <IconButton onClick={handleDrawerOpen}>
        <PaletteIcon />
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 'auto', padding: '20px' }}>
          <HexColorPicker color={color} onChange={changeColor} />
          <p>Selected Color: {color}</p>
        </div>
      </Drawer>
    </div>
  )
}
