import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CreateOrEditForm from '@components/Publish/CreateOrEditForm'
import { Box } from '@mui/material'
import UserThemeProvider from '@context/UserThemeProvider'
import { useFormContext } from '@context/FormContext'

export default function StartLayout({ children }) {
  const { setCollectionId, setUpdate } = useFormContext()
  const router = useRouter()

  useEffect(() => {
    if (
      router.isReady &&
      router.query.id &&
      typeof router.query.id === 'string'
    ) {
      if (router.query.id.startsWith('0x')) {
        setCollectionId(router.query.id)
      } else {
        const id = parseInt(router.query.id, 16)
        !isNaN(id) && setCollectionId(id)
      }
      if (router.query.id !== '0') {
        setUpdate(true)
      } else {
        setUpdate(false)
      }
    }
  }, [router.query.id, router.isReady, router.pathname])

  return (
    <Box sx={{ maxWidth: '1280px', margin: 'auto', padding: '0.2rem' }}>
      <UserThemeProvider>
        <CreateOrEditForm>{children}</CreateOrEditForm>
      </UserThemeProvider>
    </Box>
  )
}
