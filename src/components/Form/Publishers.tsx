import { useState, ReactElement } from 'react'
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

export default function Publishers(): ReactElement {
  const [restrictedPublishing, setRestrictedPublishing] =
    useState<boolean>(false)
  const [publisherAddresses, setPublisherAddresses] = useState<string[]>(['']) // Initialize with one empty string for one input field

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...publisherAddresses]
    newAddresses[index] = value
    setPublisherAddresses(newAddresses)
  }

  const addAddressField = () => {
    setPublisherAddresses([...publisherAddresses, '']) // Add another empty string for a new input field
  }

  const removeAddressField = (index: number) => {
    const newAddresses = [...publisherAddresses]
    newAddresses.splice(index, 1)
    setPublisherAddresses(newAddresses)
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h3">Allow anyone respond to this form?</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={!restrictedPublishing}
              onChange={() => setRestrictedPublishing(!restrictedPublishing)}
              color="secondary"
            />
          }
          label={
            !restrictedPublishing
              ? 'Anyone can answer and submit this form'
              : 'Restrict who can respond to this form'
          }
        />
      </Box>
      {restrictedPublishing && (
        <>
          <Divider />
          <Box sx={{ m: 2 }}>
            <Typography variant="h3">
              Would you like to add some publishers now?
            </Typography>
            {publisherAddresses.map((address, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <TextField
                  label={`Publisher address ${index + 1}`}
                  value={address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                  helperText="You can also add more later"
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
            <Button variant="outlined" onClick={addAddressField}>
              Add Another Address
            </Button>
          </Box>
        </>
      )}
    </>
  )
}
