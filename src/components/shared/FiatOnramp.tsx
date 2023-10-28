'use client'

import { ReactElement, ReactNode } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { Button } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

export default function Form({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { address } = useAccount()
  const { data } = useBalance({
    address,
    watch: true
  })

  return (
    <>
      {Number(data?.formatted) > 0.01 && children}
      {Number(data?.formatted) <= 0.01 && (
        <>
          You don't have enough funds in your wallet to pay the network fees
          <br />
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.preventDefault()
              window.open(
                'https://www.moonpay.com/en-gb/buy/matic',
                '_blank',
                'noopener,noreferrer'
              )
            }}
          >
            {'Buy funds\u00A0'}
            <OpenInNewIcon fontSize="inherit" />
          </Button>
        </>
      )}
    </>
  )
}
