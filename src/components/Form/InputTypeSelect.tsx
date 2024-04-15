import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import datatypes from '@constants/datatypes.json'
import ShortTextIcon from '@mui/icons-material/ShortText'
import NotesIcon from '@mui/icons-material/Notes'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { SvgIconComponent } from '@mui/icons-material'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import LinearScaleIcon from '@mui/icons-material/LinearScale'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import TodayIcon from '@mui/icons-material/Today'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LooksOneIcon from '@mui/icons-material/LooksOne'

interface Datatype {
  type: string
  value: number
  icon: string
}

// Icon mapping
const iconMapping: { [key: string]: SvgIconComponent } = {
  ShortTextIcon: ShortTextIcon,
  NotesIcon: NotesIcon,
  CheckBoxIcon: CheckBoxIcon,
  RadioButtonCheckedIcon: RadioButtonCheckedIcon,
  ExpandCircleDownIcon: ExpandCircleDownIcon,
  StarHalfIcon: StarHalfIcon,
  LinearScaleIcon: LinearScaleIcon,
  ToggleOnIcon: ToggleOnIcon,
  TodayIcon: TodayIcon,
  DateRangeIcon: DateRangeIcon,
  AccessTimeIcon: AccessTimeIcon,
  LooksOneIcon: LooksOneIcon
}

// Function to get the correct icon component
const getIcon = (iconName: string): SvgIconComponent => {
  return iconMapping[iconName] || ShortTextIcon // Default to ShortTextIcon if not found
}

export default function InputTypeSelect({
  setFieldDataTypes,
  fieldDataTypes,
  fieldIndex
}: {
  setFieldDataTypes: Dispatch<SetStateAction<number[]>>
  fieldDataTypes: number[]
  fieldIndex: number
}): ReactElement {
  const [selectedValue, setSelectedValue] = useState<number>(datatypes[0].value)

  useEffect(() => {
    const initialValue = fieldDataTypes[fieldIndex] || datatypes[0].value
    setSelectedValue(initialValue)
    // Update the parent state to reflect this initial value if it's not already set
    if (fieldDataTypes[fieldIndex] === undefined) {
      const updatedFieldTypes = [...fieldDataTypes]
      updatedFieldTypes[fieldIndex] = initialValue
      setFieldDataTypes(updatedFieldTypes)
    }
  }, [fieldDataTypes, fieldIndex, setFieldDataTypes])

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="select-label">Answer Type</InputLabel>
      <Select
        labelId="select-input"
        id="select"
        label="Answer Type"
        value={selectedValue}
        onChange={(e) => {
          const currentFieldNames = Array.isArray(fieldDataTypes)
            ? fieldDataTypes
            : []
          const updatedFieldTypes = [...currentFieldNames]
          updatedFieldTypes[fieldIndex] = Number(e.target.value)
          setFieldDataTypes(updatedFieldTypes)
        }}
      >
        {datatypes.map((datatype: Datatype, index: number) => {
          const Icon = getIcon(datatype.icon)
          return (
            <MenuItem value={datatype.value} key={index}>
              <Box display="flex" alignItems="center">
                <Icon style={{ marginRight: '8px' }} />
                <span>{datatype.type}</span>
              </Box>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
