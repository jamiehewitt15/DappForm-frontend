import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export default function Breadcrumb({
  orgName,
  collectionName,
  DocumentName,
  orgId,
  collectionId,
  DocumentId
}: {
  orgName: string
  collectionName?: string
  DocumentName?: string
  orgId: string
  collectionId?: string
  DocumentId?: string
}) {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      {orgName}
    </Typography>
  ]

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  )
}
