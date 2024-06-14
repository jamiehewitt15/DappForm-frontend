// Votes.tsx
import { useState, ReactElement, useEffect } from 'react'
import {
  Box,
  IconButton,
  Typography,
  Divider,
  CircularProgress
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import {
  useVotingGetUpVotes,
  useVotingGetDownVotes,
  useVotingVote as vote,
  usePrepareVotingVote as prepareVote
} from '@hooks/generated'

export default function Votes({
  documentId
}: {
  documentId: number
}): ReactElement {
  const [stateUpVotes, setStateUpVotes] = useState<number>(0)
  const [stateDownVotes, setStateDownVotes] = useState<number>(0)
  const documentIdBigInt = BigInt(documentId)

  const { data: upVotesData } = useVotingGetUpVotes({
    args: [documentIdBigInt]
  })
  const { data: downVotesData } = useVotingGetDownVotes({
    args: [documentIdBigInt]
  })

  const upVotes = upVotesData ? parseInt(upVotesData.toString(), 10) : 0
  const downVotes = downVotesData ? parseInt(downVotesData.toString(), 10) : 0

  const { config: configUpvote } = prepareVote({
    args: [documentIdBigInt, true]
  })

  const { config: configDownvote } = prepareVote({
    args: [documentIdBigInt, false]
  })

  const {
    write: writeUpvote,
    isLoading: isLoadingUpvote,
    isSuccess: isSuccessUpvote
  } = vote(configUpvote)
  const {
    write: writeDownvote,
    isLoading: isLoadingDownvote,
    isSuccess: isSuccessDownvote
  } = vote(configDownvote)

  useEffect(() => {
    setStateUpVotes(upVotes)
    setStateDownVotes(downVotes)
    if (isSuccessUpvote) {
      setStateUpVotes(upVotes + 1)
    }
    if (isSuccessDownvote) {
      setStateDownVotes(downVotes + 1)
    }
  }, [isSuccessUpvote, isSuccessDownvote, upVotes, downVotes])

  return (
    <Box
      display="flex"
      alignItems="center"
      border={1}
      borderColor="primary.main"
      borderRadius="50px"
      padding="0 8px"
      gap={1}
      bgcolor="transparent"
    >
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="body1">{stateUpVotes}</Typography>
        <IconButton
          onClick={writeUpvote}
          color="primary"
          size="small"
          disabled={isLoadingUpvote || isLoadingDownvote}
        >
          {isLoadingUpvote ? (
            <CircularProgress size={20} />
          ) : (
            <ArrowUpwardIcon />
          )}
        </IconButton>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box display="flex" alignItems="center" gap={0.5}>
        <IconButton
          onClick={writeDownvote}
          color="secondary"
          size="small"
          disabled={isLoadingUpvote || isLoadingDownvote}
        >
          {isLoadingDownvote ? (
            <CircularProgress size={20} />
          ) : (
            <ArrowDownwardIcon />
          )}
        </IconButton>
        <Typography variant="body1">{stateDownVotes}</Typography>
      </Box>
    </Box>
  )
}
