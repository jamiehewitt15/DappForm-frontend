'use client'

import { useState } from 'react'
import { BaseError, parseEther } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

import { ContractConfig } from '../contracts'
import { stringify } from '../utils/stringify'
import {
  useDatabaseOrgCreationFee,
  useDatabaseCreateOrganisation,
  usePrepareDatabaseCreateOrganisation
} from 'hooks/generated'

export function CreateOrgPrepared() {
  const [orgName, setOrgName] = useState('Test')
  const fee = useDatabaseOrgCreationFee().data

  const { config } = usePrepareDatabaseCreateOrganisation({
    args: [
      orgName,
      ['Field 1', 'Field 2', 'Field 3'],
      [0, 0, 0],
      ['Value 1', 'Value 2', 'Value 3']
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } =
    useDatabaseCreateOrganisation(config)

  // const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
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
            console.log(orgName)
            console.log(Boolean(orgName))
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
    </>
  )
}
