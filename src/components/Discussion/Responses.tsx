import { ReactElement, useState, useEffect, useMemo } from 'react'
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
import SortOptions from './SortOptions'

export default function Responses(): ReactElement {
  const router = useRouter()
  const { isSuccess } = useSubmit()
  const [selectedDoc, setSelectedDoc] = useState<any>(null)
  const [sortOption, setSortOption] = useState<string>('mostVotes')

  const [result, reexecuteQuery] = useQuery({
    query: documentsQuery,
    variables: { collectionId: convertStringToHex(router.query.id) },
    pause: !router.query.id,
    requestPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (isSuccess) {
      reexecuteQuery({ requestPolicy: 'network-only' })
    }
  }, [isSuccess, reexecuteQuery])

  const { data, fetching, error } = result

  const sortedDocuments = useMemo(() => {
    if (!data?.collection?.documents) return []

    const documents = [...data.collection.documents]

    switch (sortOption) {
      case 'mostRecent':
        return documents.sort(
          (a, b) => Number(b.blockTimestamp) - Number(a.blockTimestamp)
        )
      case 'oldest':
        return documents.sort(
          (a, b) => Number(a.blockTimestamp) - Number(b.blockTimestamp)
        )
      case 'mostComments':
        return documents.sort((a, b) => b.numOfComments - a.numOfComments)
      case 'mostVotes':
      default:
        return documents.sort((a, b) => {
          const netVotesA = Number(a.upVotes) - Number(a.downVotes)
          const netVotesB = Number(b.upVotes) - Number(b.downVotes)
          return netVotesB - netVotesA
        })
    }
  }, [data, sortOption])

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

  console.log('sortedDocuments', sortedDocuments)

  return (
    <Box>
      <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      <Box display="flex" flexDirection="column" gap={2}>
        {sortedDocuments
          .filter((doc: any) => doc.fieldValues[1] === router.query.id)
          .map((doc: any) => {
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
