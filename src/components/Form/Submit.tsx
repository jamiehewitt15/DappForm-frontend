import { ReactElement } from 'react'
import Connected from '@components/shared/Connected'
import NotConnected from '@components/shared/NotConnected'
import WrongNetwork from '@components/shared/WrongNetwork'
import FiatOnramp from '@components/shared/FiatOnramp'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Button, Typography } from '@mui/material'

export default function Submit({ write }: { write: () => void }): ReactElement {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h3">
        Finally you need to sign a transaction to complete
      </Typography>

      <NotConnected>
        <ConnectButton />
      </NotConnected>

      <Connected>
        <WrongNetwork>
          <FiatOnramp>
            <Button
              disabled={!write}
              type="submit"
              variant="contained"
              onSubmit={(e) => {
                e.preventDefault()
                write?.()
              }}
            >
              Submit
            </Button>
          </FiatOnramp>
        </WrongNetwork>
      </Connected>
    </Box>
  )
}
