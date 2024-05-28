import React from 'react'
import { Box, Typography, IconButton, Grid, Button } from '@mui/material'
import { GitHub, Email, Telegram } from '@mui/icons-material'
import { teal } from '@radix-ui/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  const extendedFooter =
    !router.pathname.startsWith('/form') &&
    !router.pathname.startsWith('/responses')

  return (
    <Box
      style={{
        background: extendedFooter ? 'white' : 'transparent',
        color: teal.teal12,
        padding: '5px 2%',
        paddingTop: '20px'
      }}
    >
      {extendedFooter && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">AltBase</Typography>
              <Typography variant="body2">Transparency earns trust.</Typography>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Typography variant="h6">Quick Links</Typography>

              <Link
                color="inherit"
                href="https://polygonscan.com/address/0xb4db1C5FcAA039DfB29Ee0A6d4744Cba9D70F307"
                target="_blank"
              >
                <Button
                  variant="text"
                  size="small"
                  style={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    padding: 1
                  }}
                >
                  Smart Contract
                </Button>
              </Link>
              <br />
              <Link
                color="inherit"
                href="https://thegraph.com/hosted-service/subgraph/jamiehewitt15/altbase"
                target="_blank"
              >
                <Button
                  variant="text"
                  size="small"
                  style={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    padding: 1
                  }}
                >
                  API Queries
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Contact</Typography>
              <IconButton
                color="inherit"
                href="mailto:support@dappform.io"
                target="_blank"
                rel="noopener"
              >
                <Email />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://t.me/JamieAltbase"
                target="_blank"
                rel="noopener"
              >
                <Telegram />
              </IconButton>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Open Source</Typography>
              <IconButton
                color="inherit"
                href="https://github.com/jamiehewitt15/altbase-frontend"
                target="_blank"
                rel="noopener"
              >
                <GitHub />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            style={{
              marginTop: '10px',
              borderTop: '1px solid #555',
              paddingTop: '10px'
            }}
          >
            <Typography variant="caption">
              All information is stored permanently on-chain. Do not share
              personal identifying information.
            </Typography>
            <Typography variant="caption">
              {extendedFooter ? (
                '© 2024 AltBase Technologies'
              ) : (
                <>
                  Created with{' '}
                  <Link
                    style={{
                      color: teal.teal12
                    }}
                    href="/"
                    target="_blank"
                  >
                    AltBase
                  </Link>
                </>
              )}
            </Typography>
          </Grid>
        </>
      )}

      {router.pathname.startsWith('/form') && (
        <Typography variant="caption" style={{ textAlign: 'center' }}>
          All information is stored permanently on-chain. Do not submit personal
          identifying information.
        </Typography>
      )}

      {!extendedFooter && (
        <Typography variant="caption" style={{ textAlign: 'center' }}>
          Created with{' '}
          <Link
            style={{
              color: teal.teal12
            }}
            href="/"
            target="_blank"
          >
            AltBase
          </Link>
        </Typography>
      )}
    </Box>
  )
}
