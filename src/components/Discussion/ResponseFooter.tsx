import { ReactElement } from 'react'
import { Box, Typography, Divider, Tooltip } from '@mui/material'
import { shortenAddress } from '@utils/index'

export default function ResponseFooter({
  address,
  blockTimestamp,
  commentButton = false,
  children
}: {
  address: string
  blockTimestamp: number
  commentButton?: boolean
  children?: ReactElement
}): ReactElement {
  const date = new Date(Number(blockTimestamp) * 1000).toLocaleDateString()

  return (
    <>
      <Divider sx={{ marginTop: '20px', marginX: '-10px' }} />
      <Box display="flex" alignItems="center">
        <Tooltip title={`Published by: ${address}`}>
          <Typography variant="caption">
            From: {shortenAddress(address)}
          </Typography>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            marginLeft: '10px',
            marginRight: '10px',
            marginBottom: '-10px'
          }}
        />
        <Typography variant="caption">Date: {date}</Typography>
        {commentButton && <>{children}</>}
      </Box>
    </>
  )
}
