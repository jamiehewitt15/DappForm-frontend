import { ConnectButton } from '@components/shared/ConnectButton'
import { Connected } from '@components/shared/Connected'
import { CreateOrgAndCollection } from '@components/CreateOrgAndCollection'
import { PublishDocument } from '@components/PublishDocument'
import { UpdateOrgAdminRole } from '@components/roles/UpdateOrgAdminRole'
import { UpdateCollectionPublisherRole } from '@components/roles/UpdateCollectionPublisherRole'
import { UpdateDocumentUpdatorRole } from '@components/roles/UpdateDocumentUpdatorRole'
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
        <PublishDocument update={false} />
        <br />
        <hr />
        <PublishDocument update={true} />
        <br />
        <hr />
        <UpdateOrgAdminRole />
        <br />
        <hr />
        <UpdateCollectionPublisherRole />
        <br />
        <hr />
        <UpdateDocumentUpdatorRole />
      </Connected>
    </>
  )
}

export default Page
