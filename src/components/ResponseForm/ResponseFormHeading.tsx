import { ReactElement, useEffect } from 'react'
import { Card, CardContent, Typography, Divider } from '@mui/material'
import { useFormContext } from '@context/FormContext'
import FormMenu from './FormMenu'

export default function ResponseFormHeading({
  children,
  showRequiredMessage = true
}: {
  children?: ReactElement
  showRequiredMessage?: boolean
}): ReactElement {
  const {
    orgName,
    collectionName,
    collectionDescription,
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
    <Card
      sx={{
        borderTop: `10px solid ${userThemeColor}`,
        marginBottom: 4,
        borderRadius: '8px',
        position: 'relative'
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
        {showRequiredMessage &&
          requiredFields.some((isRequired) => isRequired) && (
            <>
              <Divider style={{ marginBottom: '15px', marginTop: '5px' }} />
              <span style={{ color: 'red' }}>
                * Indicates required question
              </span>
            </>
          )}
        <FormMenu />
        {children}
      </CardContent>
    </Card>
  )
}
