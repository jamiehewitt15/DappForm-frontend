import Onboarding from '@components/Onboarding'
import Hero from '@components/Home/Hero'
import { Typography, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import styles from './index.module.css'

export function Page() {
  return (
    <div>
      <Hero />
      <Box>
        <Typography variant="h1" align="center">
          More transparency. More credibility.
        </Typography>
        <Typography variant="h2" align="center">
          Share your data on the blockchain. More visibility gives you more
          credibility. Let's increase transparency and earn trust.
        </Typography>
        <br />
        <Typography variant="h3" align="center">
          Share your data on the blockchain. More visibility gives you more
          credibility. Let's increase transparency and earn trust.
          <br />
          <StarIcon fontSize="small" /> Open Source - fork{' '}
          <a
            href="https://github.com/decentradb/frontend"
            target="_blank"
            rel="noopener"
          >
            this repository
          </a>{' '}
          to start your own Dapp.
        </Typography>
        <br />
        <p>
          TransparencyBase is a database on the blockchain. It's the easiest and
          cheapest way to store data on the blockchain. This makes your data
          permanently available anyone to analyse. More scrutiny leads to more
          trust.
        </p>
        <Typography variant="h3" align="center">
          <StarIcon fontSize="small" /> No need to write Solidity - this is the
          quickest way to start your blockchain project.
        </Typography>
        <br />
        <Typography variant="h3" align="center">
          <StarIcon fontSize="small" /> Save time & money - focus on your
          frontend rather than smart contracts.
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
