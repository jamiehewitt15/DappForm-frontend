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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              position: 'relative' // Ensure that the background is covered by the content
            }}
          >
            <div style={{ flex: 1 }}>
              <NavBar />
              {children}
            </div>
            <Footer />
          </div>
        </main>
      </Providers>
    </>
  )
}
