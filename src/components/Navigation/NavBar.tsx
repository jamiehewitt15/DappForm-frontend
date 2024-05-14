import { Button, Toolbar, Box, AppBar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ConnectButton } from '@components/shared/ConnectButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ThemePicker from '@components/FormElements/ThemePicker'
import { useFormContext } from '@context/FormContext'

export default function NavBar() {
  const router = useRouter()

  const {
    collectionName,
    userThemeColor,
    userBackgroundColor,
    setUserThemeColor,
    setUserBackgroundColor,
    font
  } = useFormContext()

  return (
    <Box sx={{ flex: 1 }}>
      {!router.pathname.startsWith('/form') &&
        !router.pathname.startsWith('/responses') && (
          <AppBar position="static" sx={{ bgcolor: 'white' }}>
            <Toolbar>
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
                    fontFamily: font
                  }}
                >
                  {collectionName ? collectionName : 'Untitled Form'}
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
                        width={350}
                        height={60}
                      />
                    </div>
                  </Link>
                ) : null}
              </Typography>
              {router.pathname.startsWith('/start') ? (
                <ThemePicker
                  color={userThemeColor}
                  changeColor={setUserThemeColor}
                  backgroundColor={userBackgroundColor}
                  changeBackgroundColor={setUserBackgroundColor}
                />
              ) : null}

              {router.pathname === '/' ? (
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  href="/start/0"
                >
                  Start
                </Button>
              ) : (
                <ConnectButton />
              )}
            </Toolbar>
          </AppBar>
        )}
    </Box>
  )
}
