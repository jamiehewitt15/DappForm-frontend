'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import { stringify } from '@utils/stringify'
import {
  useDatabaseCollectionUpdateFee,
  useDatabaseUpdateCollection,
  usePrepareDatabaseUpdateCollection
} from '@hooks/generated'
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material'
import datatypes from '@constants/datatypes.json'

export function UpdateCollection() {
  const [orgId, setOrgId] = useState<number>()
  const [collectionId, setCollectionId] = useState<number>()
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setInfoFieldValues] = useState<[string]>()
  const [fieldNames, setFieldNames] = useState<[string]>()
  const [fieldDataTypes, setFieldDataTypes] = useState<[number]>()
  const collectionInfoFields = ['test']
  const collectionInfoDataTypes = [0]
  const fee = useDatabaseCollectionUpdateFee().data

  const { config } = usePrepareDatabaseUpdateCollection({
    args: [
      orgId,
      collectionId,
      collectionName,
      collectionInfoFields,
      collectionInfoDataTypes,
      collectionInfoValues,
      fieldNames,
      fieldDataTypes,
      false
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } =
    useDatabaseUpdateCollection(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <h3>Update a Collection</h3>
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
          placeholder="Collection Name"
          onChange={(e) => {
            setCollectionName(e.target.value)
          }}
        />
        <input
          placeholder="Info Field Value"
          onChange={(e) => {
            setInfoFieldValues([e.target.value])
          }}
        />
        <input
          placeholder="Field Name"
          onChange={(e) => {
            setFieldNames([e.target.value])
          }}
        />
        <Select
          labelId="select-label"
          id="select"
          label="Field 1 Data Type"
          onChange={(e) => {
            setFieldDataTypes([e.target.value])
          }}
        >
          {datatypes.map((datatype) => (
            <MenuItem value={datatype.value}>{datatype.type}</MenuItem>
          ))}
        </Select>
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
