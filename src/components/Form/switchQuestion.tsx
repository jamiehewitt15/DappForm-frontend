import { ReactElement } from 'react'
import { Box, Switch, FormControlLabel, Typography } from '@mui/material'

interface SwitchQuestionProps {
  question: string
  labelOn: string
  labelOff: string
  value: boolean
  setValue: (value: boolean) => void
}

export default function SwitchQuestion({
  question,
  labelOn,
  labelOff,
  value,
  setValue
}: SwitchQuestionProps): ReactElement {
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h6">{question}</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={value}
              onChange={() => setValue(!value)}
              color="secondary"
            />
          }
          label={value ? labelOn : labelOff}
        />
      </Box>
    </>
  )
}
