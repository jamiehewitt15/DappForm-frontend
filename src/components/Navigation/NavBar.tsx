import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ConnectButton } from '@components/shared/ConnectButton'
import Link from 'next/link'
import DataArrayIcon from '@mui/icons-material/DataArray'
import Calendly from '@components/shared/Calendly'
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()

  return (
    <Box sx={{ flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <DataArrayIcon sx={{ marginBottom: '-0.2em' }} /> TransparencyBase
            </Link>
          </Typography>
          {router.pathname === '/' ? (
            <Calendly variant="outlined" />
          ) : (
            <ConnectButton />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
