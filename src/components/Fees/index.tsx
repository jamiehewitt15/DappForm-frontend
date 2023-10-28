'use client'

import { useState } from 'react'
import {
  useDecentraDbChangeAllFees,
  usePrepareDecentraDbChangeAllFees
} from '@hooks/generated'
import { useWaitForTransaction } from 'wagmi'
import { BaseError } from 'viem'
import { stringify } from '@utils/stringify'
import { Box, Typography } from '@mui/material'

export function Fees() {
  const [orgCreationFee, setOrgCreationFee] = useState<number>()
  const [collectionCreationFee, setCollectionCreationFee] = useState<number>()
  const [docCreationFee, setDocCreationFee] = useState<number>()
  const [orgUpdateFee, setOrgUpdateFee] = useState<number>()
  const [collectionUpdateFee, setCollectionUpdateFee] = useState<number>()
  const [documentUpdateFee, setDocumentUpdateFee] = useState<number>()

  const { config } = usePrepareDecentraDbChangeAllFees({
    args: [
      orgCreationFee,
      collectionCreationFee,
      docCreationFee,
      orgUpdateFee,
      collectionUpdateFee,
      documentUpdateFee
    ]
  })
  const { write, data, error, isLoading, isError } =
    useDecentraDbChangeAllFees(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="h3">Update all Fees</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        <input
          placeholder="Org Creation Fee"
          type="number"
          onChange={(e) => {
            setOrgCreationFee(Number(e.target.value))
          }}
        />
        <input
          placeholder="Collection Creation Fee"
          type="number"
          onChange={(e) => {
            setCollectionCreationFee(Number(e.target.value))
          }}
        />
        <input
          placeholder="setDocCreationFee"
          type="number"
          onChange={(e) => {
            setDocCreationFee(Number(e.target.value))
          }}
        />
        <input
          placeholder="setOrgUpdateFee"
          type="number"
          onChange={(e) => {
            setOrgUpdateFee(Number(e.target.value))
          }}
        />
        <input
          placeholder="setCollectionUpdateFee"
          type="number"
          onChange={(e) => {
            setCollectionUpdateFee(Number(e.target.value))
          }}
        />
        <input
          placeholder="setDocumentUpdateFee"
          type="number"
          onChange={(e) => {
            setDocumentUpdateFee(Number(e.target.value))
          }}
        />

        <button disabled={!write} type="submit">
          Create
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </Box>
  )
}
