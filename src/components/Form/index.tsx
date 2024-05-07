import { ReactElement, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { useUserTheme } from '@context/ThemeSelectorContext'
import { Divider, Card, CardContent, Typography, Skeleton } from '@mui/material'
import { useFormContext } from '@context/FormContext'
import Questions from './Questions'

export default function Form(): ReactElement {
  const {
    orgName,
    setOrgName,
    collectionName,
    collectionDescription,
    fetchingData
  } = useFormContext()

  const theme = useTheme()
  const { userThemeColor, userBackgroundColor, font } = useUserTheme()

  useEffect(() => {
    document.body.style.backgroundColor = userBackgroundColor

    // Cleanup function to reset the background color
    return () => {
      document.body.style.backgroundColor = '' // Reset to default or previous value
    }
  }, [userBackgroundColor])

  return (
    <>
      <Card
        sx={{
          borderTop: `10px solid ${userThemeColor}`,
          marginBottom: 4,
          borderRadius: '8px'
        }}
      >
        <CardContent>
          <Typography variant="h1" sx={{ fontFamily: font }}>
            {fetchingData ? <Skeleton /> : collectionName}
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: font }}>
            {fetchingData ? <Skeleton /> : collectionDescription}
          </Typography>
          <Typography variant="inherit" sx={{ fontFamily: font }}>
            Published by:{' '}
            <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              {fetchingData ? <Skeleton width={150} /> : orgName}
            </span>
          </Typography>
        </CardContent>
      </Card>
      <Questions />
    </>
  )
}
