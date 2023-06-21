import { ConnectButton } from '@components/shared/ConnectButton'
import { Connected } from '@components/shared/Connected'
import { CreateOrgPrepared } from '@components/WritePreparedDbContract'
import { PublishDocument } from '@components/PublishDocument'
import { UpdateDocument } from '@components/UpdateDocument'
import { UpdateOrganisation } from '@components/UpdateOrganisation'
import { WatchEvents } from '@components/WatchEvents'

export function Page() {
  return (
    <>
      <h1>wagmi + RainbowKit + Next.js</h1>

      <ConnectButton />

      <Connected>
        <h2>Write DB Contract</h2>
        <CreateOrgPrepared />
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
        <WatchEvents />
      </Connected>
    </>
  )
}

export default Page
