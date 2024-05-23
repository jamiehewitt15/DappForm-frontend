import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Backdrop,
  Box
} from '@mui/material'
import FormIcon from '@mui/icons-material/Description'
import DiscussionIcon from '@mui/icons-material/Forum'

export default function OptionsPopup() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Popup
      </Button>
      <Backdrop open={open} style={{ zIndex: 1300 }}>
        <Dialog open={open} onClose={handleClose}>
          <Box padding={2}>
            <DialogTitle>Create a:</DialogTitle>
            <DialogContent>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    border={1}
                    borderRadius={4}
                    padding={4}
                    style={{ cursor: 'pointer' }}
                  >
                    <FormIcon style={{ fontSize: 50 }} />
                    <Typography variant="h6">Form</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    border={1}
                    borderRadius={4}
                    padding={4}
                    style={{ cursor: 'pointer' }}
                  >
                    <DiscussionIcon style={{ fontSize: 50 }} />
                    <Typography variant="h6">Discussion</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Backdrop>
    </div>
  )
}
