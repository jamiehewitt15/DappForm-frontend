import { Connected } from '@components/shared/Connected'
import { CreateOrgAndCollection } from '@components/CreateOrgAndCollection'
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

export function Page() {
  return (
    <>
      <Box sx={{ m: '3rem' }}>
        <Typography variant="h1" gutterBottom align="center">
          The easiest way to start your blockchain project
        </Typography>

        <Typography variant="h4" gutterBottom align="center">
          Use the decentralised blockchain database
        </Typography>
      </Box>
      <Connected>
        <CreateOrgAndCollection />
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
    </>
  )
}

export default Page
