import '@rainbow-me/rainbowkit/styles.css'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'

import Footer from '@components/Navigation/Footer'
import { Providers } from '../providers'
import NavBar from '@components/Navigation/NavBar'

// export const metadata = {
//   title: 'DecentraDB'
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <CssBaseline />
        <main>
          <NavBar />
          <Paper sx={{ width: '95%', m: 'auto', mt: 10, mb: 10 }}>
            {children}
          </Paper>
          <Footer />
        </main>
      </Providers>
    </>
  )
}
