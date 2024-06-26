import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Dispatch, ReactElement, SetStateAction } from 'react'
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
  AccessTimeIcon: AccessTimeIcon
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
  return <FormControl sx={{ mb: 2, minWidth: 200 }}></FormControl>
}
