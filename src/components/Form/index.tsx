import { ReactElement, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { useUserTheme } from '@context/ThemeSelectorContext'
// import { useAltBaseOrganisationEvent as orgCreated } from '@hooks/generated'
import {
  TextField,
  Divider,
  Card,
  CardContent,
  Typography,
  Skeleton
} from '@mui/material'
import Publishers from '@components/FormElements/Publishers'
import SwitchQuestion from '@components/FormElements/switchQuestion'
import Fields from '@components/FormElements/Fields'
import { useFormContext } from '@context/FormContext'

export default function Form(): ReactElement {
  const {
    orgName,
    setOrgName,
    collectionName,
    collectionInfoValues,
    uniqueDocumentPerAddress,
    setUniqueDocumentPerAddress,
    orgExists,
    collectionDescription,
    setCollectionDescription,
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
          marginBottom: 2,
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
          <Typography variant="h7" sx={{ fontFamily: font }}>
            Published by: {fetchingData ? <Skeleton /> : orgName}
          </Typography>
        </CardContent>
      </Card>
      <Fields />

      <Divider />
    </>
  )
}
