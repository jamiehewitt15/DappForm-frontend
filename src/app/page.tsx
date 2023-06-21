import { ConnectButton } from '@components/shared/ConnectButton'
import { Connected } from '@components/shared/Connected'
import { CreateOrgAndCollection } from '@components/CreateOrgAndCollection'
import { PublishDocument } from '@components/PublishDocument'
import { UpdateDocument } from '@components/UpdateDocument'
import { UpdateOrganisation } from '@components/UpdateOrganisation'
import { UpdateCollection } from '@components/UpdateCollection'
import { UpdateOrgAdminRole } from '@components/UpdateOrgAdminRole'
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
        <PublishDocument />
        <br />
        <hr />
        <UpdateDocument />
        <br />
        <hr />
        <UpdateOrganisation />
        <br />
        <hr />
        <UpdateCollection />
        <br />
        <hr />
        <UpdateOrgAdminRole />
      </Connected>
    </>
  )
}

export default Page
