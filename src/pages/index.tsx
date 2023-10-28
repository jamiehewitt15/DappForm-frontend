import Onboarding from '@components/Onboarding'
import { Typography, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import styles from './index.module.css'

export function Page() {
  return (
    <div className={styles.flex}>
      <Box className={styles.boxContainer} sx={{ mt: 10 }}>
        <Typography variant="h1" align="center">
          DecentraDB.
        </Typography>
        <Box sx={{ p: '3rem' }}>
          <Typography variant="h3" align="center">
            <StarIcon fontSize="small" /> DecentraDB is the decentralised
            database running in a smart contract on Polygon.
          </Typography>
          <br />
          <Typography variant="h3" align="center">
            <StarIcon fontSize="small" /> Open Source - fork this repository to
            start your own Dapp.
          </Typography>
          <br />
          <Typography variant="h3" align="center">
            <StarIcon fontSize="small" /> No need to write Solidity - this is
            the quickest way to start your blockchain project.
          </Typography>
        </Box>
      </Box>
      {/* <Image
            src="/curved-arrow-Mediamodifier-Design.svg"
            width={300}
            height={300}
            alt="Picture of a curved arrow"
          /> */}

      <Box sx={{ m: '3rem' }} className={styles.boxContainer}>
        <Onboarding />
      </Box>
    </div>
  )
}

export default Page
