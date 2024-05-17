import React from 'react'
import { Box, Typography, IconButton, Grid, Button } from '@mui/material'
import { GitHub } from '@mui/icons-material'
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
        background: extendedFooter ? 'transparent' : null,
        color: teal.teal12,
        padding: '5px 2%'
      }}
    >
      {extendedFooter && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">AltBase</Typography>
              <Typography variant="body2">Transparency earns trust.</Typography>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1">Quick Links</Typography>
              <Link color="inherit" href="/">
                <Button
                  variant="text"
                  size="small"
                  style={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    padding: 1
                  }}
                >
                  Home
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1">Contact</Typography>
              <Typography variant="body2">support@altbase.io</Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1">Open Source</Typography>
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
              {extendedFooter
                ? 'No personal information is collected. No cookies are used.'
                : 'All information is stored permanently on-chain. Do not submit personal identifying information.'}
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
