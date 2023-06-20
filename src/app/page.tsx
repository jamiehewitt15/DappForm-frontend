import { ConnectButton } from '../components/shared/ConnectButton'
import { Connected } from '../components/shared/Connected'
import { CreateOrgPrepared } from '../components/WritePreparedDbContract'

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
      </Connected>
    </>
  )
}

export default Page
