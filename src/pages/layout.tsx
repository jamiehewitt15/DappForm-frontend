import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'

export const metadata = {
  title: 'wagmi'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <main>{children}</main>
      </Providers>
    </>
  )
}
