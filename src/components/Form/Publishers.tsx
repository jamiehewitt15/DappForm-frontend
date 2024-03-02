import { ReactElement, useState } from 'react'
import { Box, TextField, Typography, Button, IconButton } from '@mui/material'
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
    if (index >= newAddresses.length) {
      newAddresses.push(value)
    } else {
      newAddresses[index] = value
    }
    const newErrorStates = new Array(newAddresses.length).fill(false)
    newErrorStates[index] = !isAddress(value)
    props.setPublisherAddresses(newAddresses)
    setErrorStates(newErrorStates)
  }

  const addAddressField = () => {
    props.setPublisherAddresses([...props.publisherAddresses, ''])
    setErrorStates([...errorStates, false])
  }

  const removeAddressField = (index: number) => {
    if (props.publisherAddresses.length > 1) {
      const newAddresses = [...props.publisherAddresses]
      newAddresses.splice(index, 1)
      props.setPublisherAddresses(newAddresses)
      setErrorStates(newAddresses.map((address) => !isAddress(address)))
    }
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
          {(props.publisherAddresses.length > 0
            ? props.publisherAddresses
            : ['']
          ).map((address, index) => (
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
              {props.publisherAddresses.length > 1 && (
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => removeAddressField(index)}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              )}
            </Box>
          ))}
          <Button variant="outlined" onClick={addAddressField}>
            Add Ethereum Address
          </Button>
        </Box>
      )}
    </>
  )
}
