import React, { useState, ReactElement } from 'react'
import { TextField, Button, IconButton } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Rating from '@mui/material/Rating'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  DatePicker,
  LocalizationProvider,
  TimePicker
} from '@mui/x-date-pickers'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import datatypes from '@constants/datatypes.json'

interface DynamicInputProps {
  typeIndex: number
}

export default function FieldOptionsInput({
  typeIndex = 0
}: DynamicInputProps): ReactElement {
  const [options, setOptions] = useState<string[]>([])
  const type = datatypes[typeIndex].type

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, ''])
  }

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
  }

  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px'
          }}
        >
          <TextField
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            variant="standard"
            style={{ flexGrow: 1 }}
          />
          <IconButton onClick={() => removeOption(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button onClick={addOption} variant="contained">
        Add Option
      </Button>
    </>
  )
}
