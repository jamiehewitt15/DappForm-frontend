import Discussion from '@components/Discussion'
import ResponseLayout from '../ResponseLayout'

export default function DiscussionPage() {
  console.log('Loading Discussion Page')
  return (
    <ResponseLayout redirectOnSuccess={false}>
      <Discussion />
    </ResponseLayout>
  )
}
