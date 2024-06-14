// Responses.tsx
import { ReactElement } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Tooltip
} from '@mui/material'
import { documentsQuery } from '@src/queries/documents'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { convertStringToHex, shortenAddress } from '@utils/index'
import Votes from './Votes'

export default function Responses(): ReactElement {
  const router = useRouter()

  const [result] = useQuery({
    query: documentsQuery,
    variables: { collectionId: convertStringToHex(router.query.id) },
    pause: !router.query.id
  })

  const { data, fetching, error } = result

  if (fetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="20vh"
      >
        <CircularProgress />
      </Box>
    )
  }
  if (error) {
    return (
      <Alert severity="error">Error loading responses: {error.message}</Alert>
    )
  }

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {data?.collection?.documents
          .filter((doc: any) => doc.fieldValues[1] === router.query.id)
          .map((doc: any) => {
            const date = new Date(
              Number(doc.blockTimestamp) * 1000
            ).toLocaleDateString()

            return (
              <Card
                key={doc.id}
                sx={{
                  borderRadius: '8px'
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body2">
                        {doc.fieldValues[0]}
                      </Typography>
                    </Box>
                    <Votes documentId={doc.id} />
                  </Box>
                  <Divider sx={{ marginTop: '20px' }} />
                  <Box display="flex" alignItems="center">
                    <Typography variant="caption">
                      From:{' '}
                      <Tooltip title={doc.transactionFrom}>
                        <>{shortenAddress(doc.transactionFrom)}</>
                      </Tooltip>
                    </Typography>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginLeft: '10px', marginRight: '10px' }}
                    />
                    <Typography variant="caption">Date: {date}</Typography>
                  </Box>
                </CardContent>
              </Card>
            )
          })}
      </Box>
    </Box>
  )
}
