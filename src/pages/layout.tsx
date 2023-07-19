import '@rainbow-me/rainbowkit/styles.css'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import { Providers } from './providers'
import NavBar from '@components/Navigation/NavBar'

export const metadata = {
  title: 'wagmi'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <CssBaseline />
        <main>
          <NavBar />
          <Container maxWidth="lg" sx={{ mb: 16 }}>
            {children}
          </Container>
        </main>
      </Providers>
    </>
  )
}
