// PopupCard.tsx
import { ReactElement } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Tooltip,
  IconButton,
  Backdrop
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Votes from './Votes'
import { shortenAddress } from '@utils/index'

interface PopupCardProps {
  open: boolean
  onClose: () => void
  content: any // Adjust this type based on your actual content type
}

export default function PopupCard({
  open,
  onClose,
  content
}: PopupCardProps): ReactElement {
  if (!open) return null

  const date = new Date(
    Number(content.blockTimestamp) * 1000
  ).toLocaleDateString()

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Card
        sx={{
          position: 'relative',
          width: '80%',
          maxWidth: '850px',
          borderRadius: '8px',
          backgroundColor: 'white',
          padding: '25px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="body2">{content.fieldValues[0]}</Typography>
            </Box>
            <Votes documentId={content.id} />
          </Box>
          <Divider sx={{ marginTop: '20px' }} />
          <Box display="flex" alignItems="center">
            <Typography variant="caption">
              From:{' '}
              <Tooltip title={content.transactionFrom}>
                <>{shortenAddress(content.transactionFrom)}</>
              </Tooltip>
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ marginLeft: '10px', marginRight: '10px' }}
            />
            <Typography variant="caption">Date: {date}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Backdrop>
  )
}
