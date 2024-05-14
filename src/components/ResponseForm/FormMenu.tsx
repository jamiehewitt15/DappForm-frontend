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
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 100, vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableScrollLock
      >
        {!router.pathname.startsWith('/form') && (
          <Permission requiredLevel={1} id={String(collectionId)}>
            <MenuItem onClick={handleMenuClose}>
              <Link href={`/form/${collectionId}`} underline="none">
                View form
              </Link>
            </MenuItem>
          </Permission>
        )}
        {!router.pathname.startsWith('/responses') && (
          <Permission requiredLevel={1} id={String(collectionId)}>
            <MenuItem onClick={handleMenuClose}>
              <Link href={`/responses/${collectionId}`} underline="none">
                View responses
              </Link>
            </MenuItem>
          </Permission>
        )}
        <Divider />
        <Permission requiredLevel={2} id={String(collectionId)}>
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
