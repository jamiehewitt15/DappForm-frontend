'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import { stringify } from '@utils/stringify'
import {
  useDecentraDbOrgCreationFee,
  useDecentraDbOrgUpdateFee,
  useDecentraDbCreateOrUpdateOrganisation,
  usePrepareDecentraDbCreateOrUpdateOrganisation
} from '@hooks/generated'
import { Box } from '@mui/material'

export function Organisation({ update }: { update: boolean }) {
  const [orgId, setOrgId] = useState<number>()
  const [orgName, setOrgName] = useState<string>()
  const [values, setValues] = useState<[string]>([''])
  const [retire, setRetire] = useState<boolean>(false)

  const fieldNames = ['test']
  const fieldDataTypes = [0]
  const fee = update
    ? useDecentraDbOrgUpdateFee().data
    : useDecentraDbOrgCreationFee().data

  const { config } = usePrepareDecentraDbCreateOrUpdateOrganisation({
    args: [
      update ? orgId : 0,
      orgName,
      fieldNames,
      fieldDataTypes,
      values,
      update,
      update ? retire : false
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } =
    useDecentraDbCreateOrUpdateOrganisation(config)

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
        {update && (
          <input
            placeholder="Organisation ID"
            type="number"
            onChange={(e) => {
              setOrgId(Number(e.target.value))
            }}
          />
        )}
        <input
          placeholder="Organisation Name"
          onChange={(e) => {
            setOrgName(e.target.value)
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
