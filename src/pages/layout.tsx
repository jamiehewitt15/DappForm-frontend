import '@rainbow-me/rainbowkit/styles.css'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import localFont from 'next/font/local'

const antipasto = localFont({
  src: [
    {
      path: './fonts/antipasto.thin.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/antipasto.regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/antipasto.bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ]
})
const myFont = localFont({ src: './fonts/antipasto.bold.ttf' })
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
        <main className={myFont.className}>
          <NavBar />
          <Container maxWidth="lg">{children}</Container>
        </main>
      </Providers>
    </>
  )
}
