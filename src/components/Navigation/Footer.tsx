import React from 'react'
import { Box, Typography, IconButton, Grid, Button } from '@mui/material'
import { Twitter } from '@mui/icons-material'
import { teal } from '@radix-ui/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  const extendedFooter = !router.pathname.startsWith('/form')

  return (
    <Box
      style={{
        backgroundColor: '#fff',
        color: teal.teal12,
        padding: '40px 10%'
      }}
    >
      {extendedFooter && (
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">AltBase</Typography>
            <Typography>Transparency earns trust.</Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Typography variant="h6">Quick Links</Typography>
            <Link color="inherit" href="/">
              <Button
                variant="text"
                size="small"
                style={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  padding: 2
                }}
              >
                Home
              </Button>
            </Link>
            <br />
            <Link color="inherit" href="/allorganisations">
              <Button
                variant="text"
                size="small"
                style={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  padding: 2
                }}
              >
                Organisations
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Contact</Typography>
            <Typography>support@decentradb.com</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Socials</Typography>
            {/* <IconButton
            color="inherit"
            href="https://github.com/decentradb/frontend"
            target="_blank"
            rel="noopener"
          >
            <GitHub />
          </IconButton> */}
            {/* <IconButton
            color="inherit"
            href="https://www.reddit.com/r/DecentraDB/"
            target="_blank"
            rel="noopener"
          >
            <Reddit />
          </IconButton> */}
            <IconButton
              color="inherit"
              href="https://twitter.com/altbaseio"
              target="_blank"
              rel="noopener"
            >
              <Twitter />
            </IconButton>
          </Grid>
        </Grid>
      )}

      <Grid
        container
        justifyContent="space-between"
        style={{
          marginTop: '20px',
          borderTop: '1px solid #555',
          paddingTop: '20px'
        }}
      >
        <Typography variant="body2">
          {extendedFooter
            ? 'No personal information is collected. No cookies are used.'
            : 'All information is stored permantly on-chain. Do not submit personal identifying information.'}
        </Typography>
        <Typography variant="body2">
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
              >
                AltBase
              </Link>
            </>
          )}
        </Typography>
      </Grid>
    </Box>
  )
}
