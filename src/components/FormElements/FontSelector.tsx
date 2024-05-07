import { ReactElement, useEffect, useState } from 'react'
import { MenuItem, Select, Typography, SelectChangeEvent } from '@mui/material'
import { customFonts } from '@constants/Fonts'
import { useFormContext } from '@context/FormContext'

export default function FontSelector(): ReactElement {
  const { font, setFont } = useFormContext()
  const [fontName, setFontName] = useState('')

  useEffect(() => {
    // Find the font name based on the font stack stored in the theme context
    const foundFont = customFonts.find((f) => f.stack === font)
    if (foundFont) {
      setFontName(foundFont.name)
    }
  }, [font])

  const handleChange = (event: SelectChangeEvent<string>) => {
    const fontStack =
      customFonts.find((f) => f.name === event.target.value)?.stack ||
      customFonts[0].stack
    setFont(fontStack)
  }

  return (
    <>
      <Typography variant="h6">Select a Font</Typography>
      <Select
        value={fontName}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select font' }}
        sx={{ width: '100%' }}
        style={{ fontFamily: font }}
      >
        {customFonts.map((option) => (
          <MenuItem
            key={option.name}
            value={option.name}
            style={{ fontFamily: option.stack }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
