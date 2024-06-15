import React, { ReactElement } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'

export default function SortOptions({
  sortOption,
  setSortOption
}: {
  sortOption: string
  setSortOption: (option: string) => void
}): ReactElement {
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          label="Sort By"
          size="small"
        >
          <MenuItem value="mostVotes">Most Votes</MenuItem>
          <MenuItem value="mostRecent">Most Recent</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="mostComments">Most Comments</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
