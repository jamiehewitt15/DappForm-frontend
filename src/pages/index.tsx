import { Connected } from '@components/shared/Connected'
import Onboarding from '@components/Onboarding'
import { Document } from '@components/Document'
import { UpdateOrgAdminRole } from '@components/Roles/UpdateOrgAdminRole'
import { UpdateCollectionPublisherRole } from '@components/Roles/UpdateCollectionPublisherRole'
import { UpdateDocumentUpdatorRole } from '@components/Roles/UpdateDocumentUpdatorRole'
import { Organisation } from '@components/Organisation'
import { Collection } from '@components/Collection'
import { Fees } from '@components/Fees'
import { WatchEvents } from '@components/WatchEvents'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import Box from '@mui/material/Box'
import Image from 'next/image'
import styles from './index.module.css'

export function Page() {
  return (
    <>
      <Box sx={{ m: '3rem' }} className={styles.boxContainer}>
        <Typography variant="h1" gutterBottom align="center">
          The easiest way to start your blockchain project.
        </Typography>

        <Typography variant="h4" align="center">
          Use the decentralised blockchain database
        </Typography>
        <Connected>
          <Image
            src="/curved-arrow-Mediamodifier-Design.svg"
            width={300}
            height={300}
            alt="Picture of a curved arrow"
          />
          <Onboarding />
          <br />
          <hr />
          <Document update={false} />
          <br />
          <hr />
          <Document update={true} />
          <br />
          <hr />
          <Organisation update={true} />
          <br />
          <hr />
          <Collection update={true} />
          <br />
          <hr />
          <UpdateOrgAdminRole />
          <br />
          <hr />
          <UpdateCollectionPublisherRole />
          <br />
          <hr />
          <UpdateDocumentUpdatorRole />
          <br />
          <hr />
          <Fees />
        </Connected>
      </Box>
    </>
  )
}

export default Page
