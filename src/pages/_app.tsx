import Layout from './layout'
import './global.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <Layout>
      <Component key={router.asPath} {...pageProps} />
    </Layout>
  )
}
