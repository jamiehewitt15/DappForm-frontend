'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction, useAccount } from 'wagmi'
import { stringify } from '@utils/stringify'
import {
  useDecentraDbDocCreationFee,
  useDecentraDbPublishOrUpdateDocument,
  usePrepareDecentraDbPublishOrUpdateDocument,
  useDecentraDbIsCollectionPublisher
} from '@hooks/generated'
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material'

export function PublishDocument({ update }: { update: boolean }) {
  const [docId, setDocId] = useState<number>()
  const [orgId, setOrgId] = useState<number>()
  const [collectionId, setCollectionId] = useState<number>()
  const [values, setValues] = useState<[string]>()
  const [retire, setRetire] = useState<boolean>(false)

  const fieldNames = ['test']
  const fieldDataTypes = [0]
  const fee = useDecentraDbDocCreationFee().data
  const { address } = useAccount()

  const BigNum = BigInt('1')
  const roles = useDecentraDbIsCollectionPublisher({
    args: [BigNum, BigNum, address]
  })

  const { config } = usePrepareDecentraDbPublishOrUpdateDocument({
    args: [
      update ? docId : 0,
      orgId,
      collectionId,
      fieldNames,
      fieldDataTypes,
      values,
      update,
      update ? retire : false
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } =
    useDecentraDbPublishOrUpdateDocument(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <h3>Publish a Document</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        {update && (
          <input
            placeholder="Document ID"
            type="number"
            onChange={(e) => {
              setDocId(Number(e.target.value))
            }}
          />
        )}
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
          placeholder="Value"
          onChange={(e) => {
            setValues([e.target.value])
          }}
        />
        {update && (
          <input
            placeholder="Retire document?"
            type="boolean"
            onChange={(e) => {
              setRetire(Boolean(e.target.value))
            }}
          />
        )}

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
