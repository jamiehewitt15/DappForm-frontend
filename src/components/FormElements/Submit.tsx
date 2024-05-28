import { ReactElement } from 'react'
import Connected from '@components/shared/Connected'
import NotConnected from '@components/shared/NotConnected'
import WrongNetwork from '@components/shared/WrongNetwork'
import FiatOnramp from '@components/shared/FiatOnramp'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Button, CircularProgress, Typography } from '@mui/material'

export default function Submit({
  write,
  buttonText,
  isLoading,
  isPending,
  isIndexing = false
}: {
  write: () => void
  buttonText: string
  isLoading: any
  isPending: any
  isIndexing?: boolean
}): ReactElement {
  return (
    <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
      <NotConnected>
        <ConnectButton />
      </NotConnected>

      <Connected>
        <WrongNetwork>
          <FiatOnramp>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Button
                disabled={!write}
                type="submit"
                variant="contained"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                {(isLoading || isPending || isIndexing) && (
                  <CircularProgress
                    size={15}
                    sx={{
                      marginRight: '8px'
                    }}
                    color="inherit"
                  />
                )}
                {isLoading
                  ? 'Check wallet...'
                  : isPending
                  ? 'Transaction pending...'
                  : isIndexing
                  ? 'Indexing data...'
                  : buttonText}
              </Button>
              <Typography variant="caption" sx={{ marginTop: '8px' }}>
                Approximate cost: 0.006 MATIC ≈ 0.004 USD.
              </Typography>
            </Box>
          </FiatOnramp>
        </WrongNetwork>
      </Connected>
    </Box>
  )
}
