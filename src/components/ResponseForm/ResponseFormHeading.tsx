import { ReactElement, useEffect } from 'react'
import { CardContent, Typography, Divider, Link, Tooltip } from '@mui/material'
import { useFormContext } from '@context/FormContext'
import FormMenu from './FormMenu'
import CollectionThemedCard from '@components/shared/CollectionThemedCard'

export default function ResponseFormHeading({
  children,
  showRequiredMessage = true
}: {
  children?: ReactElement
  showRequiredMessage?: boolean
}): ReactElement {
  const {
    orgName,
    orgId,
    collectionName,
    collectionDescription,
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
    <CollectionThemedCard>
      <CardContent>
        <Typography
          variant="h1"
          sx={{
            fontFamily: font,
            fontSize: {
              xs: '1.5rem', // Font size for mobile devices
              sm: '2rem', // Font size for tablets
              md: '2.5rem' // Font size for larger screens
            }
          }}
        >
          {collectionName}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: font,
            fontSize: {
              xs: '1rem', // Font size for mobile devices
              sm: '1.25rem', // Font size for tablets
              md: '1.5rem' // Font size for larger screens
            },
            marginBottom: {
              xs: '10px', // Margin for mobile devices
              sm: '15px', // Margin for tablets
              md: '20px' // Margin for larger screens
            }
          }}
        >
          {collectionDescription}
        </Typography>
        <Typography
          variant="inherit"
          sx={{
            fontFamily: font,
            fontSize: {
              xs: '0.875rem', // Font size for mobile devices
              sm: '1rem', // Font size for tablets
              md: '1.125rem' // Font size for larger screens
            }
          }}
        >
          Published by:{' '}
          <Tooltip title="View all forms">
            <Link href={`/user/${orgId}`}>
              <span style={{ display: 'inline-block' }}>{orgName}</span>
            </Link>
          </Tooltip>
        </Typography>
        {showRequiredMessage &&
          requiredFields.some((isRequired) => isRequired) && (
            <>
              <Divider
                sx={{
                  marginBottom: {
                    xs: '10px', // Margin for mobile devices
                    sm: '15px', // Margin for tablets
                    md: '20px' // Margin for larger screens
                  },
                  marginTop: {
                    xs: '5px', // Margin for mobile devices
                    sm: '10px', // Margin for tablets
                    md: '15px' // Margin for larger screens
                  }
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'red',
                  fontSize: {
                    xs: '0.75rem', // Font size for mobile devices
                    sm: '0.875rem', // Font size for tablets
                    md: '1rem' // Font size for larger screens
                  }
                }}
              >
                * Indicates required question
              </Typography>
            </>
          )}
        <FormMenu />
        {children}
      </CardContent>
    </CollectionThemedCard>
  )
}
