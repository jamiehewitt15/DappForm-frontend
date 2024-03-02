import { ReactElement, useState } from 'react'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Rating from '@mui/material/Rating'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import {
  TimePicker,
  DatePicker,
  LocalizationProvider
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import datatypes from '@constants/datatypes.json'

export default function DynamicInput({
  typeIndex = 0
}: {
  typeIndex: number
}): ReactElement {
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

  const renderComponent = () => {
    switch (type) {
      case 'Single line text':
        return (
          <TextField label="Single line text" variant="standard" disabled />
        )
      case 'Multi line text':
        return (
          <TextField
            label="Multi line text"
            variant="standard"
            multiline
            rows={2}
            disabled
          />
        )

      case 'Number':
        return <TextField label="Number" type="number" variant="standard" />
      case 'Checkboxes':
        return <Checkbox disabled />
      case 'Multiple choice':
        return <Radio disabled />
      case 'Drop-down':
        return (
          <Select native value="" disabled>
            <option>Option 1</option>
          </Select>
        )
      case 'Rating':
        return <Rating />
      case 'Slider':
        return <Slider defaultValue={30} />
      case 'Switch':
        return <Switch />
      case 'time':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker readOnly />
          </LocalizationProvider>
        )
      case 'Date':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker readOnly />
          </LocalizationProvider>
        )
      case 'Date range':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker readOnly />
          </LocalizationProvider>
        )
      default:
        return <div>Component type not recognized.</div>
    }
  }

  return <>{renderComponent()}</>
}
