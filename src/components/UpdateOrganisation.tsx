'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import { stringify } from '@utils/stringify'
import {
  useDatabaseOrgUpdateFee,
  useDatabaseUpdateOrganisation,
  usePrepareDatabaseUpdateOrganisation
} from '@hooks/generated'
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material'

export function UpdateOrganisation() {
  const [orgId, setOrgId] = useState<number>()
  const [orgName, setOrgName] = useState<[string]>()
  const [values, setValues] = useState<[string]>()
  const fieldNames = ['test']
  const fieldDataTypes = [0]
  const fee = useDatabaseOrgUpdateFee().data

  const { config } = usePrepareDatabaseUpdateOrganisation({
    args: [orgId, orgName, fieldNames, fieldDataTypes, values, false],
    value: fee
  })
  const { write, data, error, isLoading, isError } =
    useDatabaseUpdateOrganisation(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <h3>Update an Organisation</h3>
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
          placeholder="Organisation Name"
          onChange={(e) => {
            setOrgName([e.target.value])
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
