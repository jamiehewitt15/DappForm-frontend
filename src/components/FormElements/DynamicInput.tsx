import { ReactElement } from 'react'
import TextField from '@mui/material/TextField'
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
import OptionInput from './OptionInput'
import { useFormContext } from '@context/FormContext'

export default function DynamicInput({
  index = 0,
  deactivated = true
}: {
  index: number
  deactivated?: boolean
}): ReactElement {
  const { fieldDataTypes } = useFormContext()
  const typeIndex = fieldDataTypes[index] ? fieldDataTypes[index] : 0
  const type = datatypes[typeIndex].type

  const renderComponent = () => {
    switch (type) {
      case 'Single line text':
        return (
          <TextField
            label="Single line text"
            variant="standard"
            fullWidth={true}
            disabled={deactivated}
          />
        )
      case 'Multi line text':
        return (
          <TextField
            label="Multi line text"
            variant="standard"
            multiline
            rows={2}
            disabled={deactivated}
          />
        )

      case 'Number':
        return <TextField label="Number" type="number" variant="standard" />
      case 'Checkboxes':
        return <OptionInput inputType="checkbox" index={index} />
      case 'Multiple choice':
        return <OptionInput inputType="radio" index={index} />
      case 'Drop-down':
        return <OptionInput inputType="select" index={index} />
      case 'Rating':
        return <Rating />
      case 'Slider':
        return <Slider defaultValue={30} />
      case 'Switch':
        return <Switch />
      case 'time':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker readOnly={deactivated} />
          </LocalizationProvider>
        )
      case 'Date':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker readOnly={deactivated} />
          </LocalizationProvider>
        )
      case 'Date range':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker readOnly={deactivated} />
          </LocalizationProvider>
        )
      default:
        return <div>Component type not recognized.</div>
    }
  }

  return <>{renderComponent()}</>
}
