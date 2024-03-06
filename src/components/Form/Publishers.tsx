import { ReactElement, useState } from 'react'
import { Box, TextField, Typography, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SwitchQuestion from './switchQuestion'
import { isAddress } from 'viem'
import { useFormContext } from '@context/FormContext'

export default function Publishers(): ReactElement {
  const {
    restrictedPublishing,
    setRestrictedPublishing,
    publisherAddresses,
    setPublisherAddresses
  } = useFormContext()
  const [errorStates, setErrorStates] = useState<boolean[]>(
    new Array(publisherAddresses.length).fill(false)
  )

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...publisherAddresses]
    if (index >= newAddresses.length) {
      newAddresses.push(value)
    } else {
      newAddresses[index] = value
    }
    const newErrorStates = new Array(newAddresses.length).fill(false)
    newErrorStates[index] = !isAddress(value)
    setPublisherAddresses(newAddresses)
    setErrorStates(newErrorStates)
  }

  const addAddressField = () => {
    setPublisherAddresses([...publisherAddresses, ''])
    setErrorStates([...errorStates, false])
  }

  const removeAddressField = (index: number) => {
    if (publisherAddresses.length > 1) {
      const newAddresses = [...publisherAddresses]
      newAddresses.splice(index, 1)
      setPublisherAddresses(newAddresses)
      setErrorStates(newAddresses.map((address) => !isAddress(address)))
    }
  }

  return (
    <>
      <SwitchQuestion
        question="Allow anyone to respond to this form?"
        labelOn="Anyone can answer and submit this form"
        labelOff="Restrict who can respond to this form"
        value={!restrictedPublishing}
        setValue={(newValue: boolean) => setRestrictedPublishing(!newValue)}
      />

      {restrictedPublishing && (
        <Box sx={{ m: 2 }}>
          <Typography variant="h6">
            Add the address of accounts that will be allowed to respond to the
            form
          </Typography>
          {(publisherAddresses.length > 0 ? publisherAddresses : ['']).map(
            (address, index) => (
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
                {publisherAddresses.length > 1 && (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => removeAddressField(index)}
                  >
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                )}
              </Box>
            )
          )}
          <Button variant="outlined" onClick={addAddressField}>
            Add Ethereum Address
          </Button>
        </Box>
      )}
    </>
  )
}
