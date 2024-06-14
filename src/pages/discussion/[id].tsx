import Discussion from '@components/Discussion'
import ResponseLayout from '../ResponseLayout'

export default function DiscussionPage() {
  return (
    <ResponseLayout redirectOnSuccess={false}>
      <Discussion />
    </ResponseLayout>
  )
}
