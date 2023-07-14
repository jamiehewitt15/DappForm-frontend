import { ConnectButton } from '@components/shared/ConnectButton'
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

export function Page() {
  return (
    <>
      <h1>wagmi + RainbowKit + Next.js</h1>

      <ConnectButton />

      <Connected>
        <h2>Write DB Contract</h2>
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
