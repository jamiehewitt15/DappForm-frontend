// Responses.tsx
import { ReactElement } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert
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
        height="100vh"
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
        {data?.collection?.documents.map((doc: any) => (
          <Card key={doc.id}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="body2">{doc.fieldValues[0]}</Typography>
                  <Typography variant="caption">
                    From: {shortenAddress(doc.transactionFrom)}
                  </Typography>
                </Box>
                <Votes />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
