import {
  Button,
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Tooltip
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { ConnectButton } from '@components/shared/ConnectButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ThemePicker from '@components/FormElements/ThemePicker'
import { useFormContext } from '@context/FormContext'
import { useAccount } from 'wagmi'
import DeviceRender from '@components/shared/DeviceRender'
import OptionsPopup from '@components/Onboarding/OptionsPopup'
import EyeIcon from '@mui/icons-material/Visibility'
import ClearForm from '@components/FormElements/ClearForm'

export default function NavBar() {
  const router = useRouter()
  const account = useAccount()

  const {
    collectionName,
    userThemeColor,
    userBackgroundColor,
    setUserThemeColor,
    setUserBackgroundColor,
    font,
    orgId
  } = useFormContext()

  return (
    <Box sx={{ flex: 1, width: '100vw', overflowX: 'hidden' }}>
      {!router.pathname.startsWith('/form') &&
        !router.pathname.startsWith('/responses') && (
          <AppBar
            position="static"
            sx={{ bgcolor: 'white', width: '100vw', margin: 0, padding: 0 }}
          >
            <Toolbar sx={{ width: '100vw', padding: 0 }}>
              {router.pathname.startsWith('/start') ||
              router.pathname.startsWith('/form') ? (
                <Typography
                  variant="h2"
                  component="div"
                  color="textPrimary"
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: font,
                    marginLeft: '0.5rem',
                    fontSize: {
                      xs: '1.5rem', // Font size for mobile devices
                      sm: '2rem', // Font size for tablets
                      md: '2.5rem' // Font size for larger screens
                    }
                  }}
                >
                  {collectionName ? collectionName : null}
                </Typography>
              ) : null}
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
              >
                {!router.pathname.startsWith('/start') &&
                !router.pathname.startsWith('/form') ? (
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
                        width={200}
                        height={60}
                      />
                    </div>
                  </Link>
                ) : null}
              </Typography>

              {router.pathname === '/' && orgId && account && (
                <Button
                  variant="text"
                  size="large"
                  color="primary"
                  href={`/user/${orgId}`}
                  sx={{ marginRight: '1rem' }}
                >
                  My Forms
                </Button>
              )}

              {router.pathname.startsWith('/start') ? (
                <>
                  <IconButton
                    component="a"
                    href="/form/0"
                    target="_blank"
                    sx={{ marginRight: '1rem' }}
                  >
                    <Tooltip title="View preview">
                      <EyeIcon />
                    </Tooltip>
                  </IconButton>
                  <ThemePicker
                    color={userThemeColor}
                    changeColor={setUserThemeColor}
                    backgroundColor={userBackgroundColor}
                    changeBackgroundColor={setUserBackgroundColor}
                  />
                  <ClearForm />
                </>
              ) : null}

              <DeviceRender devices={['desktop']}>
                {router.pathname.startsWith('/discussion') && (
                  <OptionsPopup>
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      sx={{ marginRight: '30px' }}
                    >
                      Create
                    </Button>
                  </OptionsPopup>
                )}
                {router.pathname === '/' ? (
                  <OptionsPopup>
                    <Button variant="outlined" size="large" color="primary">
                      Start
                    </Button>
                  </OptionsPopup>
                ) : (
                  <ConnectButton />
                )}
              </DeviceRender>
            </Toolbar>
          </AppBar>
        )}
    </Box>
  )
}
