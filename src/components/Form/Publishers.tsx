import { ReactElement, useState } from 'react'
import {
  Box,
  TextField,
  Divider,
  Switch,
  FormControlLabel,
  Typography,
  Button,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SwitchQuestion from './switchQuestion'
import { isAddress } from 'viem'

interface PublishersProps {
  restrictedPublishing: boolean
  setRestrictedPublishing: (value: boolean) => void
  publisherAddresses: string[]
  setPublisherAddresses: (addresses: string[]) => void
}

export default function Publishers(props: PublishersProps): ReactElement {
  const [errorStates, setErrorStates] = useState<boolean[]>(
    new Array(props.publisherAddresses.length).fill(false)
  )

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...props.publisherAddresses]
    const newErrorStates = [...errorStates]
    newAddresses[index] = value
    newErrorStates[index] = !isAddress(value)
    props.setPublisherAddresses(newAddresses)
    setErrorStates(newErrorStates)
  }

  const addAddressField = () => {
    props.setPublisherAddresses([...props.publisherAddresses, '']) // Add another empty string for a new input field
    setErrorStates([...errorStates, false]) // Add false to error states for the new field
  }

  const removeAddressField = (index: number) => {
    const newAddresses = [...props.publisherAddresses]
    const newErrorStates = [...errorStates]
    newAddresses.splice(index, 1)
    newErrorStates.splice(index, 1)
    props.setPublisherAddresses(newAddresses)
    setErrorStates(newErrorStates)
  }

  return (
    <>
      <SwitchQuestion
        question="Allow anyone to respond to this form?"
        labelOn="Anyone can answer and submit this form"
        labelOff="Restrict who can respond to this form"
        value={!props.restrictedPublishing}
        setValue={(newValue: boolean) =>
          props.setRestrictedPublishing(!newValue)
        }
      />

      {props.restrictedPublishing && (
        <Box sx={{ m: 2 }}>
          <Typography variant="h6">
            Add the address of accounts that will be allowed to respond to the
            form
          </Typography>
          <br />
          {props.publisherAddresses.map((address, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
            >
              <TextField
                label={`Address ${index + 1}`}
                value={address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
                helperText={
                  errorStates[index] ? 'Invalid Ethereum address' : ''
                }
                error={errorStates[index]}
                fullWidth
              />
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => removeAddressField(index)}
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </Box>
          ))}
          <p>You can also add more later</p>
          <Button variant="outlined" onClick={addAddressField}>
            Add Ethereum Address
          </Button>
        </Box>
      )}
    </>
  )
}
