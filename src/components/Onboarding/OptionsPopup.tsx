import React, { useState, ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Backdrop,
  Box,
  IconButton
} from '@mui/material'
import FormIcon from '@mui/icons-material/Description'
import DiscussionIcon from '@mui/icons-material/Forum'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'

interface OptionsPopupProps {
  children: ReactNode
}

export default function OptionsPopup({ children }: OptionsPopupProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRedirect = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  return (
    <div onClick={handleClickOpen}>
      {children}
      <Backdrop open={open} style={{ zIndex: 1300 }} onClick={handleClose}>
        <Dialog
          open={open}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
        >
          <Box padding={2} position="relative">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
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
                    onClick={() => handleRedirect('/start/0')}
                  >
                    <FormIcon style={{ fontSize: 50 }} />
                    <Typography
                      variant="h6"
                      sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Form
                    </Typography>
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
                    onClick={() => handleRedirect('/start/discussion/0')}
                  >
                    <DiscussionIcon style={{ fontSize: 50 }} />
                    <Typography variant="h6">Discussion</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Box>
        </Dialog>
      </Backdrop>
    </div>
  )
}
