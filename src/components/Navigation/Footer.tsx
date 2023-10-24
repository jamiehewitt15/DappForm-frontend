import React from 'react'
import { Box, Typography, IconButton, Grid } from '@mui/material'
import { Twitter, Reddit } from '@mui/icons-material'
import Discord from '@icons/DiscordIcon'
import { slate, teal } from '@radix-ui/colors'
import Link from 'next/link'

export default function Footer() {
  return (
    <Box
      style={{
        backgroundColor: slate.slate2,
        color: teal.teal12,
        padding: '40px 10%'
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">DecentraDB</Typography>
          <Typography>
            The fastest way to build Dapps.
            <br />
            Unmatched agility and efficiency.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography variant="h6">Quick Links</Typography>
          <Link color="inherit" href="/">
            Home
          </Link>
          <br />
          <Link color="inherit" href="/allorganisations">
            Organisations
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Contact</Typography>
          <Typography>support@decentradb.com</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Follow Us</Typography>
          <IconButton
            color="inherit"
            href="https://www.reddit.com/r/DecentraDB/"
          >
            <Reddit />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com/DecentraDB">
            <Twitter />
          </IconButton>
          <IconButton color="inherit" href="https://discord.gg/2SQRUTcP">
            <Discord />
          </IconButton>
        </Grid>
      </Grid>

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
          No personal information is collected. No cookies are used.
        </Typography>
        <Typography variant="body2">© 2023 DecentraDB</Typography>
      </Grid>
    </Box>
  )
}
