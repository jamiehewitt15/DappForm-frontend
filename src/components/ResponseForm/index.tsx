import { ReactElement, useEffect } from 'react'
import { Card, CardContent, Typography, Divider } from '@mui/material'
import { useFormContext } from '@context/FormContext'
import Questions from './Questions'

export default function Form(): ReactElement {
  const {
    orgName,
    collectionName,
    collectionDescription,
    fetchingData,
    userThemeColor,
    userBackgroundColor,
    font,
    requiredFields
  } = useFormContext()
  console.log('response form fetchingData', fetchingData)

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
            {collectionName}
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: font }}>
            {collectionDescription}
          </Typography>
          <Typography variant="inherit" sx={{ fontFamily: font }}>
            Published by:{' '}
            <span style={{ display: 'inline-block' }}>{orgName}</span>
          </Typography>
          {requiredFields.some((isRequired) => isRequired) && (
            <>
              <Divider style={{ marginBottom: '15px', marginTop: '5px' }} />
              <span style={{ color: 'red' }}>
                * Indicates required question
              </span>
            </>
          )}
        </CardContent>
      </Card>
      <Questions />
    </>
  )
}
