import { ReactElement, useEffect } from 'react'
import { Card, CardContent, Typography, Divider, Link } from '@mui/material'
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
        <Typography variant="h1" sx={{ fontFamily: font }}>
          {collectionName}
        </Typography>
        <Typography variant="h5" sx={{ fontFamily: font }}>
          {collectionDescription}
        </Typography>
        <Typography variant="inherit" sx={{ fontFamily: font }}>
          Published by:{' '}
          <Link href={`/user/${orgId}`}>
            <span style={{ display: 'inline-block' }}>{orgName}</span>
          </Link>
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
    </CollectionThemedCard>
  )
}
