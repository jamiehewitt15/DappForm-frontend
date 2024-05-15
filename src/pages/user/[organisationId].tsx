import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Link,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'
import { useQuery } from 'urql'
import { organisationQuery } from '@queries/v1/organisation'
import { convertStringToHex } from '@utils/index'
import { useRouter } from 'next/router'
import CollectionThemedCard from '@components/shared/CollectionThemedCard'

const sortCollections = (collections: any[], sortBy: string) => {
  if (collections && collections.length > 0) {
    switch (sortBy) {
      case 'newest':
        return [...collections].sort(
          (a, b) => b.blockTimestamp - a.blockTimestamp
        )
      case 'oldest':
        return [...collections].sort(
          (a, b) => a.blockTimestamp - b.blockTimestamp
        )
      case 'mostDocuments':
        return [...collections].sort(
          (a, b) => b.documentCount - a.documentCount
        )
      case 'az':
        return [...collections].sort((a, b) =>
          a.collectionName.localeCompare(b.collectionName)
        )
      case 'za':
        return [...collections].sort((a, b) =>
          b.collectionName.localeCompare(a.collectionName)
        )
      default:
        return collections
    }
  }
}

export default function CollectionsGrid() {
  const router = useRouter()
  const [orgId, setOrgId] = useState<string>()
  const [sortBy, setSortBy] = useState<string>('newest')

  useEffect(() => {
    if (router.isReady && router.query.organisationId) {
      const hexOrgId = convertStringToHex(router.query.organisationId as string)
      setOrgId(hexOrgId)
    }
  }, [router.isReady, router.query.organisationId])

  const [result] = useQuery({
    query: organisationQuery,
    variables: { orgId }
  })

  const { data, fetching, error } = result

  if (fetching || !data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        padding="20%"
      >
        <CircularProgress />
      </Box>
    )
  }
  if (error) {
    return <p>Oh no... {error.message}</p>
  }

  const collections = sortCollections(data?.organisation?.collections, sortBy)

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Forms published by: {data.organisation.organisationName}
      </Typography>
      <FormControl sx={{ mb: 6 }} size="small">
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          label="Sort by"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="newest">Newest to Oldest</MenuItem>
          <MenuItem value="oldest">Oldest to Newest</MenuItem>
          <MenuItem value="mostDocuments">Most Responses</MenuItem>
          <MenuItem value="az">A - Z</MenuItem>
          <MenuItem value="za">Z - A</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {collections &&
          collections.map((collection: any) => (
            <Grid item xs={12} sm={6} md={4} key={collection.collectionName}>
              <Link href={`/form/${collection.id}`}>
                <CollectionThemedCard color={collection.userThemeColor}>
                  <CardContent>
                    <Typography variant="h4" component="div">
                      {collection.collectionName}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {collection.description || ''}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Number of Documents: {collection.documentCount}
                    </Typography>
                  </CardContent>
                </CollectionThemedCard>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
