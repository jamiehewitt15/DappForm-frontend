// Responses.tsx
import { ReactElement, useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Button
} from '@mui/material'
import { documentsQuery } from '@src/queries/documents'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { convertStringToHex } from '@utils/index'
import Votes from './Votes'
import ResponseDetail from './ResponseDetail'
import { useSubmit } from '@context/SubmitContext'
import ResponseFooter from './ResponseFooter'

export default function Responses(): ReactElement {
  const router = useRouter()
  const { isSuccess } = useSubmit()
  const [selectedDoc, setSelectedDoc] = useState<any>(null) // Adjust this type based on your actual content type

  const [result, reexecuteQuery] = useQuery({
    query: documentsQuery,
    variables: { collectionId: convertStringToHex(router.query.id) },
    pause: !router.query.id,
    requestPolicy: 'cache-and-network' // You can use 'network-only' if you want to always refetch
  })

  // Use useEffect to refetch the query when isSuccess changes
  useEffect(() => {
    if (isSuccess) {
      reexecuteQuery({ requestPolicy: 'network-only' })
    }
  }, [isSuccess, reexecuteQuery])

  const { data, fetching, error } = result

  // Filter comments based on responseTo field
  const comments = data?.collection?.documents?.filter(
    (doc: any) => doc.fieldValues[1] === selectedDoc?.id
  )

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

            // Count comments
            const numOfComments = data.collection.documents.filter(
              (d: any) => d.fieldValues[1] === doc.id
            ).length

            return (
              <Card
                key={doc.id}
                sx={{
                  borderRadius: '8px'
                }}
              >
                <CardContent
                  sx={{
                    paddingBottom: '1px !important'
                  }}
                >
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
                  <ResponseFooter
                    address={doc.transactionFrom}
                    blockTimestamp={doc.blockTimestamp}
                    commentButton={true}
                  >
                    <>
                      {' '}
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ marginLeft: '10px', marginRight: '10px' }}
                      />
                      <Button onClick={() => setSelectedDoc(doc)}>
                        <Typography variant="caption">
                          {numOfComments === 0
                            ? 'Comment'
                            : `${numOfComments} Comments`}
                        </Typography>
                      </Button>
                    </>
                  </ResponseFooter>
                </CardContent>
              </Card>
            )
          })}
      </Box>
      <ResponseDetail
        open={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        content={selectedDoc}
        comments={comments}
      />
    </Box>
  )
}
