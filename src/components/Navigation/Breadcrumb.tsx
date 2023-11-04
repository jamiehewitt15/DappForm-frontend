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
  collectionId
}: {
  orgName: string
  collectionName?: string
  DocumentName?: string
  orgId?: string
  collectionId?: string
}) {
  const lastItem = DocumentName
    ? DocumentName
    : collectionName
    ? collectionName
    : orgName

  // Initialize breadcrumbs with the first item
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>
  ]

  // Conditionally push the second item if `orgId` is present
  if (orgId) {
    breadcrumbs.push(
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href={`/organisation/${orgId}`}
      >
        {orgName}
      </Link>
    )
  }

  // Conditionally push the third item if `collectionId` is present
  if (collectionId) {
    breadcrumbs.push(
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href={`/collection/${collectionId}`}
      >
        {collectionName}
      </Link>
    )
  }

  // Always push the last item
  breadcrumbs.push(
    <Typography key="3" color="text.primary">
      {lastItem}
    </Typography>
  )

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  )
}
