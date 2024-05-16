import { Box, Typography, Card, Grid } from '@mui/material'
import StarList from '@components/shared/StarList'
import Image from 'next/image'

export default function CallToAction() {
  const items = [
    'Forms that store data on the blockchain.',
    'Define the datatype for each field on your form.',
    'Set roles - who is allowed to add & edit data.',
    'Track the history of all data in your database.'
  ]

  return (
    <Card sx={{ m: 6, p: 5 }}>
      <Typography variant="h1" align="center" sx={{ m: 4, mb: 8 }}>
        Features
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <StarList items={items} />
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            style={{
              border: '1px solid black',
              padding: '5px',
              borderRadius: '8px'
            }}
          >
            <Image
              src="/altbase-screenshot.png"
              alt="Screenshot"
              width={500} // Adjust the width as needed
              height={300} // Adjust the height as needed
              layout="intrinsic"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}
