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
  useDecentraDbOrgCreationFee,
  useDecentraDbCollectionCreationFee,
  useDecentraDbCreateOrganisationAndCollectionAndAddRoles as createOrg,
  usePrepareDecentraDbCreateOrganisationAndCollectionAndAddRoles as prepareCreateOrg
} from '@hooks/generated'
import { Box, MenuItem, Select } from '@mui/material'

interface Datatype {
  type: string
  value: number
}

export function CreateOrgAndCollection() {
  const [orgName, setOrgName] = useState<string>('')
  const [orgInfoValues, setOrgInfoValues] = useState<string[]>()
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>()
  const [fieldNames, setFieldNames] = useState<string[]>()
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>()
  const [publishers, setPublishers] = useState<string[]>([])

  const orgFee = useDecentraDbOrgCreationFee().data
  const collectionFee = useDecentraDbCollectionCreationFee().data
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  const { config } = prepareCreateOrg({
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
      fieldDataTypes,
      publishers
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } = createOrg(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <h3>Create an Organisation and a collection</h3>
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
        <input
          placeholder="Publishers"
          onChange={(e) => {
            setPublishers([e.target.value])
          }}
        />
        <Select
          labelId="select-label"
          id="select"
          label="Field 1 Data Type"
          onChange={(e) => {
            setFieldDataTypes([Number(e.target.value)])
          }}
        >
          {datatypes.map((datatype: Datatype) => (
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
