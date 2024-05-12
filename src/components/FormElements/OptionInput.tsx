import { ReactElement } from 'react'
import {
  TextField,
  IconButton,
  Button,
  Checkbox,
  Radio,
  Select,
  Switch
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useFormContext } from '@context/FormContext'

interface OptionInputProps {
  inputType: 'checkbox' | 'radio' | 'select' | 'switch'
  index: number
}

export default function OptionInput({
  inputType,
  index
}: OptionInputProps): ReactElement {
  const { fieldOptions, setFieldOptions } = useFormContext()

  const handleOptionChange = (optionIndex: number, value: string) => {
    // Update specific option at the given index
    const updatedOptions = [...fieldOptions[index]]
    updatedOptions[optionIndex] = value
    const newFieldOptions = [...fieldOptions]
    newFieldOptions[index] = updatedOptions
    setFieldOptions(newFieldOptions)
  }

  const addOption = () => {
    // Add a new option
    const newFieldOptions = [...fieldOptions]
    newFieldOptions[index] = [...fieldOptions[index], ''] // Add empty string as new option
    setFieldOptions(newFieldOptions)
  }

  const removeOption = (optionIndex: number) => {
    // Remove specific option
    const updatedOptions = fieldOptions[index].filter(
      (_, i) => i !== optionIndex
    )
    const newFieldOptions = [...fieldOptions]
    newFieldOptions[index] = updatedOptions
    setFieldOptions(newFieldOptions)
  }

  const renderInputComponent = () => {
    switch (inputType) {
      case 'checkbox':
        return (
          <Checkbox disabled size="medium" style={{ marginBottom: '-5px' }} />
        )
      case 'radio':
        return <Radio disabled size="medium" style={{ marginBottom: '-5px' }} />
      case 'select':
        return (
          <Select
            native
            value=""
            disabled
            style={{ marginBottom: '-10px', marginRight: '20px' }}
          >
            <option>Option</option>
          </Select>
        )
      case 'switch':
        return <Switch style={{ marginBottom: '-5px' }} />
      default:
        return null
    }
  }

  return (
    <>
      {fieldOptions[index].map((option, optIndex) => (
        <div
          key={optIndex}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: '20px'
          }}
        >
          {renderInputComponent()}
          <TextField
            value={option}
            onChange={(e) => handleOptionChange(optIndex, e.target.value)}
            variant="standard"
            label={inputType !== 'switch' ? `Option ${optIndex + 1}` : 'Label'}
          />
          {inputType !== 'switch' && (
            <IconButton
              onClick={() => removeOption(optIndex)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}
      {inputType !== 'switch' && (
        <>
          {renderInputComponent()}
          <Button
            onClick={addOption}
            variant="text"
            color="primary"
            style={{ marginBottom: '-5px' }}
          >
            Add Option
          </Button>
        </>
      )}
    </>
  )
}
