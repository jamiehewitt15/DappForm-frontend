import { ReactElement } from 'react'
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

interface PublishersProps {
  restrictedPublishing: boolean
  setRestrictedPublishing: (value: boolean) => void
  publisherAddresses: string[]
  setPublisherAddresses: (addresses: string[]) => void
}

export default function Publishers(props: PublishersProps): ReactElement {
  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...props.publisherAddresses]
    newAddresses[index] = value
    props.setPublisherAddresses(newAddresses)
  }

  const addAddressField = () => {
    props.setPublisherAddresses([...props.publisherAddresses, '']) // Add another empty string for a new input field
  }

  const removeAddressField = (index: number) => {
    const newAddresses = [...props.publisherAddresses]
    newAddresses.splice(index, 1)
    props.setPublisherAddresses(newAddresses)
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h3">Allow anyone respond to this form?</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={!props.restrictedPublishing}
              onChange={() =>
                props.setRestrictedPublishing(!props.restrictedPublishing)
              }
              color="secondary"
            />
          }
          label={
            !props.restrictedPublishing
              ? 'Anyone can answer and submit this form'
              : 'Restrict who can respond to this form'
          }
        />
      </Box>
      {props.restrictedPublishing && (
        <>
          <Divider />
          <Box sx={{ m: 2 }}>
            <Typography variant="h3">
              Would you like to add some publishers now?
            </Typography>
            {props.publisherAddresses.map((address, index) => (
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
