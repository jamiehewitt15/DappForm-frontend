'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import { stringify } from '@utils/stringify'
import {
  useDatabaseDocumentUpdateFee,
  useDatabaseUpdateDocument,
  usePrepareDatabaseUpdateDocument
} from '@hooks/generated'
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material'

export function UpdateDocument() {
  const [orgId, setOrgId] = useState<number>()
  const [collectionId, setCollectionId] = useState<number>()
  const [documentId, setDocumentId] = useState<number>()
  const [values, setValues] = useState<[string]>()
  const fieldNames = ['test']
  const fieldDataTypes = [0]
  const fee = useDatabaseDocumentUpdateFee().data

  const { config } = usePrepareDatabaseUpdateDocument({
    args: [
      orgId,
      collectionId,
      documentId,
      fieldNames,
      fieldDataTypes,
      values,
      false
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } =
    useDatabaseUpdateDocument(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <h3>Update a Document</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        <input
          placeholder="Organisation ID"
          type="number"
          onChange={(e) => {
            setOrgId(Number(e.target.value))
          }}
        />
        <input
          placeholder="Collection ID"
          type="number"
          onChange={(e) => {
            setCollectionId(Number(e.target.value))
          }}
        />
        <input
          placeholder="Document ID"
          type="number"
          onChange={(e) => {
            setDocumentId(Number(e.target.value))
          }}
        />
        <input
          placeholder="Value"
          onChange={(e) => {
            setValues([e.target.value])
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
