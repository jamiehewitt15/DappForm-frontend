'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import {
  orgInfoFields,
  orgInfoDataTypes,
  collectionInfoFields,
  collectionInfoDataTypes
} from '@constants/InfoConstants'
import datatypes from '@constants/datatypes.json'
import { stringify } from '@utils/stringify'
import {
  useDatabaseOrgCreationFee,
  useDatabaseCollectionCreationFee,
  useDatabaseCreateOrganisationAndCollection,
  usePrepareDatabaseCreateOrganisationAndCollection
} from '@hooks/generated'
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material'

export function CreateOrgPrepared() {
  const [orgName, setOrgName] = useState<string>('')
  const [orgInfoValues, setOrgInfoValues] = useState<[string]>()
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<[string]>()
  const [fieldNames, setFieldNames] = useState<[string]>()
  const [fieldDataTypes, setFieldDataTypes] = useState<[number]>()

  const orgFee = useDatabaseOrgCreationFee().data
  const collectionFee = useDatabaseCollectionCreationFee().data
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  const { config } = usePrepareDatabaseCreateOrganisationAndCollection({
    args: [
      orgName,
      orgInfoFields,
      orgInfoDataTypes,
      orgInfoValues,
      collectionName,
      collectionInfoFields,
      collectionInfoDataTypes,
      collectionInfoValues,
      fieldNames,
      fieldDataTypes
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } =
    useDatabaseCreateOrganisationAndCollection(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <h3>Create an Organisation</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        <input
          placeholder="Organisation Name"
          onChange={(e) => {
            setOrgName(e.target.value)
          }}
        />
        <input
          placeholder="Organisation Logo link"
          onChange={(e) => {
            setOrgInfoValues([e.target.value])
          }}
        />
        <input
          placeholder="Collection Name"
          onChange={(e) => {
            setCollectionName(e.target.value)
          }}
        />
        <input
          placeholder="Collection Description"
          onChange={(e) => {
            setCollectionInfoValues([e.target.value])
          }}
        />
        <input
          placeholder="Collection Field 1 Name"
          onChange={(e) => {
            setFieldNames([e.target.value])
          }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
