import { ReactElement, useEffect } from 'react'
import { Card, CardContent, Typography, Skeleton } from '@mui/material'
import { useFormContext } from '@context/FormContext'
import Questions from './Questions'

export default function Form(): ReactElement {
  const {
    orgName,
    setOrgName,
    collectionName,
    collectionDescription,
    fetchingData,
    userThemeColor,
    userBackgroundColor,
    font,
    requiredFields
  } = useFormContext()

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
            <span style={{ display: 'inline-block' }}>
              {fetchingData ? <Skeleton width={150} /> : orgName}
            </span>
          </Typography>
          {<span style={{ color: 'red' }}>* Indicates required question</span>}
        </CardContent>
      </Card>
      <Questions />
    </>
  )
}
