import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ConnectButton } from '@components/shared/ConnectButton'
import Link from 'next/link'
import Calendly from '@components/shared/Calendly'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function NavBar() {
  const router = useRouter()

  return (
    <Box sx={{ flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex', // Apply Flexbox
                alignItems: 'center', // Align items vertically
                height: '100%' // Take full height of the parent
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Image
                  src="/logo-transparent-svg.svg"
                  alt="AltBase Logo"
                  width={350}
                  height={60}
                />
              </div>
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
