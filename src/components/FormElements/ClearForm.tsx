import { useFormContext } from '@context/FormContext'
import { customFonts } from '@constants/Fonts'
import { Box, Tooltip, IconButton, Typography, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ClearForm({
  showText = false
}: {
  showText?: boolean
}) {
  const {
    setOrgName,
    setCollectionName,
    setUniqueDocumentPerAddress,
    setCollectionDescription,
    setUserThemeColor,
    setUserBackgroundColor,
    setFont,
    setFieldNames,
    setFieldDataTypes,
    setFieldOptions,
    setRequiredFields,
    setOrgId,
    setRestrictedPublishing,
    setPublisherAddresses,
    setCollectionInfoValues,
    setCollectionId,
    setUpdate,
    setFormResponses,
    setFieldsIndex,
    setFieldIds,
    setCreatingOrEditing
  } = useFormContext()

  const defaultState = {
    orgName: '',
    collectionName: '',
    collectionDescription: '',
    collectionInfoValues: [],
    fieldNames: [],
    fieldDataTypes: [],
    fieldOptions: [['']],
    requiredFields: [false],
    uniqueDocumentPerAddress: false,
    orgId: 0,
    restrictedPublishing: false,
    publisherAddresses: [],
    orgExists: false,
    collectionId: 0,
    update: false,
    formResponses: [],
    userThemeColor: '#4DA06D',
    userBackgroundColor: '#fff',
    font: customFonts[0].stack,
    fetchingData: false,
    fieldsIndex: [],
    fieldIds: ['field-1'],
    creatingOrEditing: false
  }

  const resetToDefaults = () => {
    Object.keys(defaultState).forEach((key) => {
      localStorage.removeItem(key)
    })
    setOrgName(defaultState.orgName)
    setCollectionName(defaultState.collectionName)
    setCollectionDescription(defaultState.collectionDescription)
    setCollectionInfoValues(defaultState.collectionInfoValues)
    setFieldNames(defaultState.fieldNames)
    setFieldDataTypes(defaultState.fieldDataTypes)
    setFieldOptions(defaultState.fieldOptions)
    setRequiredFields(defaultState.requiredFields)
    setUniqueDocumentPerAddress(defaultState.uniqueDocumentPerAddress)
    setOrgId(defaultState.orgId)
    setRestrictedPublishing(defaultState.restrictedPublishing)
    setPublisherAddresses(defaultState.publisherAddresses)
    setCollectionId(defaultState.collectionId)
    setUpdate(defaultState.update)
    setFormResponses(defaultState.formResponses)
    setUserThemeColor(defaultState.userThemeColor)
    setUserBackgroundColor(defaultState.userBackgroundColor)
    setFont(defaultState.font)
    setFieldsIndex(defaultState.fieldsIndex)
    setFieldIds(defaultState.fieldIds)
    setCreatingOrEditing(defaultState.creatingOrEditing)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Clear form">
        <IconButton onClick={resetToDefaults}>
          <DeleteIcon sx={{ width: 30, height: 30, marginRight: '10px' }} />
        </IconButton>
      </Tooltip>
      {showText && (
        <Button
          onClick={resetToDefaults}
          sx={{ textTransform: 'none', marginLeft: '-8px', color: 'inherit' }}
        >
          <Typography variant="body1">Clear form</Typography>
        </Button>
      )}
    </Box>
  )
}
