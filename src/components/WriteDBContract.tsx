'use client'

import { BaseError } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

import { wagmiContractConfig } from './contracts'
import { stringify } from '../utils/stringify'
import { parseEther } from 'viem'

export function CreateOrg() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...wagmiContractConfig,
    functionName: 'createOrganisation',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <h3>Create an Organisation</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const orgName = formData.get('orgName') as string
          write({
            args: ["Test", ["Field 1", "Field 2", "Field 3"], [0, 0, 0], ["Value 1", "Value 2", "Value 3"]],
            value: parseEther('0.0001')
          })
        }}
      >
        <input name="orgName" placeholder="Organisation Name" />
        <button disabled={isLoading} type="submit">
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
