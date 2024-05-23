import { ReactElement, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { TextField, Card, CardContent } from '@mui/material'
import { useFormContext } from '@context/FormContext'

export default function CreateDiscussion(): ReactElement {
  const {
    orgName,
    setOrgName,
    collectionName,
    setCollectionName,
    orgExists,
    collectionDescription,
    setCollectionDescription,
    userThemeColor,
    userBackgroundColor,
    font,
    setFieldNames,
    setFieldDataTypes,
    setRequiredFields,
    setFieldOptions
  } = useFormContext()

  const theme = useTheme()

  useEffect(() => {
    document.body.style.backgroundColor = userBackgroundColor

    // Cleanup function to reset the background color
    return () => {
      document.body.style.backgroundColor = '' // Reset to default or previous value
    }
  }, [userBackgroundColor])

  useEffect(() => {
    setFieldNames(['Response', 'responseTo'])
    setFieldDataTypes([1, 2])
    setRequiredFields([true, true])
    setFieldOptions([[], []])
  }, [])

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
          <TextField
            required
            id="outlined-required"
            label="Discussion Title"
            placeholder="The topic or question to discuss"
            variant="standard"
            value={collectionName}
            onChange={(e) => {
              setCollectionName(e.target.value)
            }}
            sx={{
              mr: 2,
              width: '100%',
              '& .MuiInputBase-input': {
                fontSize: {
                  xs: '1.5rem', // Mobile
                  sm: '2rem', // Tablet
                  md: '3.5rem' // Desktop
                },
                fontFamily: font
              }
            }}
            InputProps={{
              style: {
                ...theme.typography.h1
              }
            }}
          />
          <TextField
            placeholder="Further details / explanation"
            label="Discussion topic details"
            multiline
            rows={4}
            variant="standard"
            value={collectionDescription}
            onChange={(e) => {
              setCollectionDescription(e.target.value)
            }}
            sx={{
              mr: 2,
              width: '100%',
              '& .MuiInputBase-input': {
                fontSize: {
                  xs: '0.875rem', // Mobile
                  sm: '1rem', // Tablet
                  md: '1.25rem' // Desktop
                },
                fontFamily: font
              }
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Published by?"
            value={orgName}
            variant="standard"
            placeholder="Your alias or organisation Name"
            disabled={orgExists}
            onChange={(e) => {
              setOrgName(e.target.value)
            }}
            sx={{
              mr: 2,
              width: '100%',
              '& .MuiInputBase-input': {
                fontSize: {
                  xs: '0.875rem', // Mobile
                  sm: '1rem', // Tablet
                  md: '1.25rem' // Desktop
                },
                fontFamily: font
              }
            }}
          />
        </CardContent>
      </Card>
    </>
  )
}
