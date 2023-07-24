import '@rainbow-me/rainbowkit/styles.css'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import Footer from '@components/Navigation/Footer'
import { Providers } from './providers'
import NavBar from '@components/Navigation/NavBar'

export const metadata = {
  title: 'DecentraDB'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <CssBaseline />
        <main>
          <NavBar />
          {children}
          <Footer />
        </main>
      </Providers>
    </>
  )
}
