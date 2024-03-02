import { useState } from 'react'
import {
  TextField,
  IconButton,
  Button,
  Checkbox,
  Radio,
  Select
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface OptionInputProps {
  inputType: 'checkbox' | 'radio' | 'select'
}

export default function OptionInput({ inputType }: OptionInputProps) {
  const [options, setOptions] = useState<string[]>([''])

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
      default:
        return null
    }
  }

  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'flex-end', // Align items to the bottom
            marginBottom: '20px'
          }}
        >
          {renderInputComponent()}
          <TextField
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            variant="standard"
            label={`Option ${index + 1}`}
          />
          <IconButton onClick={() => removeOption(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
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
  )
}
