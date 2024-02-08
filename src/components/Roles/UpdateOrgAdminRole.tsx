'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import { stringify } from '@utils/stringify'
import {
  useAltBaseUpdateOrgAdminRole,
  usePrepareDecentraDbUpdateOrgAdminRole
} from '@hooks/generated'
import { Box, MenuItem, Select, Typography } from '@mui/material'

export function UpdateOrgAdminRole() {
  const [orgId, setOrgId] = useState<number>()
  const [userAddress, setUserAddress] = useState<string>('')
  const [status, setStatus] = useState<boolean>()

  const { config } = usePrepareDecentraDbUpdateOrgAdminRole({
    args: [orgId, userAddress, status]
  })
  const { write, data, error, isLoading, isError } =
    useAltBaseUpdateOrgAdminRole(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="h3">Update an Organisation Admin Role</Typography>
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
          placeholder="User Address"
          onChange={(e) => {
            setUserAddress(e.target.value)
          }}
        />
        <Select
          labelId="status-select-label"
          id="select-status"
          label="User Status"
          onChange={(e) => {
            setStatus(e.target.value as boolean)
          }}
        >
          <MenuItem value="true">Access Granted</MenuItem>
          <MenuItem value="false">Access Revoked</MenuItem>
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
