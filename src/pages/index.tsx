import Onboarding from '@components/Onboarding'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import styles from './index.module.css'

export function Page() {
  return (
    <div className={styles.flex}>
      <Box className={styles.boxContainer} sx={{ mt: 10 }}>
        <Typography variant="h1" align="center">
          The easiest way to start your blockchain project.
        </Typography>

        <Typography variant="h5" align="center">
          DecentraDB is the decentralised database running in a smart contract.
          It provides the blockchain backend to your application.
        </Typography>
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
