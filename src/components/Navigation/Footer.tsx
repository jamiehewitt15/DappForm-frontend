import React from 'react'
import { Box, Typography, Link, IconButton, Grid } from '@mui/material'
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material'
import { slate, teal } from '@radix-ui/colors'

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
          <Link color="inherit" href="#">
            Home
          </Link>
          <br />
          <Link color="inherit" href="#">
            Features
          </Link>
          <br />
          <Link color="inherit" href="#">
            Pricing
          </Link>
          <br />
          <Link color="inherit" href="#">
            About Us
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Contact</Typography>
          <Typography>support@decentradb.com</Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Follow Us</Typography>
          <IconButton color="inherit" href="#">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" href="#">
            <Twitter />
          </IconButton>
          <IconButton color="inherit" href="#">
            <LinkedIn />
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
          {/* <Link color="inherit" href="#">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#">
            Terms of Service
          </Link> */}
        </Typography>
        <Typography variant="body2">© 2023 BlockTable Inc.</Typography>
      </Grid>
    </Box>
  )
}
