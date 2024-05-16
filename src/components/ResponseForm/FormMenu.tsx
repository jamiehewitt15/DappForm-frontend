import { ReactElement, useState, MouseEvent } from 'react'
import { Divider, Link, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useFormContext } from '@context/FormContext'
import Permission from '@components/shared/Permission'
import { useRouter } from 'next/router'

export default function FormMenu(): ReactElement {
  const router = useRouter()
  const { collectionId } = useFormContext()

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorElement)

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorElement(null)
  }

  return (
    <>
      <IconButton
        aria-label="actions"
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          '@media (max-width: 600px)': {
            top: 4,
            right: 4
          }
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableScrollLock
        sx={{
          '@media (max-width: 600px)': {
            '.MuiMenuItem-root': {
              minWidth: '120px',
              fontSize: '0.875rem',
              padding: '10px 16px'
            }
          }
        }}
      >
        {!router.pathname.startsWith('/form') && (
          <MenuItem onClick={handleMenuClose}>
            <Link href={`/form/${collectionId}`} underline="none">
              View form
            </Link>
          </MenuItem>
        )}
        {!router.pathname.startsWith('/responses') && (
          <MenuItem onClick={handleMenuClose}>
            <Link href={`/responses/${collectionId}`} underline="none">
              View responses
            </Link>
          </MenuItem>
        )}
        <Permission requiredLevel={2} id={String(collectionId)}>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <Link href={`/start/${collectionId}`} underline="none">
              Edit form
            </Link>
          </MenuItem>
        </Permission>
      </Menu>
    </>
  )
}
