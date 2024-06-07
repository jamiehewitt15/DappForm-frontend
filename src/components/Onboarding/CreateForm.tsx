import { ReactElement, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import {
  TextField,
  Divider,
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip
} from '@mui/material'
import Publishers from '@components/FormElements/Publishers'
import SwitchQuestion from '@components/FormElements/switchQuestion'
import Fields from '@components/FormElements/Fields'
import ThemePicker from '@components/FormElements/ThemePicker'
import { useFormContext } from '@context/FormContext'
import EyeIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearForm from '@components/FormElements/ClearForm'

export default function CreateForm(): ReactElement {
  const {
    orgName,
    setOrgName,
    collectionName,
    setCollectionName,
    uniqueDocumentPerAddress,
    setUniqueDocumentPerAddress,
    orgExists,
    collectionDescription,
    setCollectionDescription,
    userThemeColor,
    userBackgroundColor,
    font,
    setUserThemeColor,
    setUserBackgroundColor
  } = useFormContext()

  const theme = useTheme()

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
          <TextField
            required
            id="outlined-required"
            label="Form Title"
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
            placeholder="Form description"
            label="Form Description"
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
      <Fields />

      <Divider sx={{ marginY: 2 }} />
      <Card
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 1,
          borderRadius: '8px'
        }}
      >
        <SwitchQuestion
          question="Allow users to respond multiple times?"
          labelOn="Users can submit this form multiple times"
          labelOff="Only one response per address is allowed"
          value={!uniqueDocumentPerAddress}
          setValue={(newValue: boolean) =>
            setUniqueDocumentPerAddress(!newValue)
          }
        />
        <Publishers />
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(2)
          }}
        >
          <ThemePicker
            color={userThemeColor}
            changeColor={setUserThemeColor}
            backgroundColor={userBackgroundColor}
            changeBackgroundColor={setUserBackgroundColor}
            showText={true}
          />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginX: theme.spacing(2) }}
          />
          <IconButton
            component="a"
            href="/form/0"
            target="_blank"
            sx={{ marginRight: '1rem' }}
          >
            <Tooltip title="View preview">
              <EyeIcon />
            </Tooltip>
          </IconButton>
          <Button
            href="/form/0"
            target="_blank"
            sx={{ textTransform: 'none', marginLeft: '-8px', color: 'inherit' }}
          >
            <Typography variant="body1">Preview</Typography>
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginX: theme.spacing(2) }}
          />
          <ClearForm showText={true} />
        </Box>
      </Card>
    </>
  )
}
