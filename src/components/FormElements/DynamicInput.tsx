import { ReactElement } from 'react'
import {
  TextField,
  RadioGroup,
  Rating,
  Slider,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Radio,
  FormGroup,
  Checkbox,
  FormControl,
  InputLabel
} from '@mui/material'
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
  index,
  deactivated = true
}: {
  index: number
  deactivated?: boolean
}): ReactElement {
  const { fieldDataTypes, setFormResponses, formResponses, fieldOptions } =
    useFormContext()
  const typeIndex = fieldDataTypes[index] ? fieldDataTypes[index] : 0
  const type = datatypes[typeIndex].type

  const handleFormResponses = (value: string) => {
    const newResponses = [...formResponses]
    newResponses[index] = value
    setFormResponses(newResponses)
  }

  const renderComponent = () => {
    switch (type) {
      case 'Single line text':
        return (
          <TextField
            label="Single line text"
            variant="standard"
            fullWidth={true}
            disabled={deactivated}
            onChange={(e) => {
              handleFormResponses(e.target.value)
            }}
          />
        )
      case 'Multi line text':
        return (
          <TextField
            label="Multi line text"
            variant="standard"
            fullWidth={true}
            multiline
            rows={3}
            disabled={deactivated}
            onChange={(e) => {
              handleFormResponses(e.target.value)
            }}
          />
        )

      case 'Number':
        return (
          <TextField
            label="Number"
            type="number"
            variant="standard"
            fullWidth={true}
            disabled={deactivated}
            onChange={(e) => {
              handleFormResponses(e.target.value)
            }}
          />
        )
      case 'Checkboxes':
        return deactivated ? (
          <OptionInput inputType="checkbox" index={index} />
        ) : (
          <FormGroup>
            {fieldOptions[index].map((option, i) => (
              <FormControlLabel
                key={i}
                value={option}
                control={<Checkbox />}
                label={option}
              />
            ))}
          </FormGroup>
        )
      case 'Multiple choice':
        return deactivated ? (
          <OptionInput inputType="radio" index={index} />
        ) : (
          <RadioGroup>
            {fieldOptions[index].map((option, i) => (
              <FormControlLabel
                key={i}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        )
      case 'Drop-down':
        return deactivated ? (
          <OptionInput inputType="select" index={index} />
        ) : (
          <FormControl fullWidth>
            <InputLabel id="dropdown-select-label">Choose</InputLabel>
            <Select label="Choose">
              {fieldOptions[index].map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
