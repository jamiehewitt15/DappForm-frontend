import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ConnectButton } from '@components/shared/ConnectButton'
import Link from 'next/link'
import DataArrayIcon from '@mui/icons-material/DataArray'

export default function NavBar() {
  return (
    <Box sx={{ flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <DataArrayIcon sx={{ marginBottom: '-0.2em' }} /> DecentraDB
            </Link>
          </Typography>
          <ConnectButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
