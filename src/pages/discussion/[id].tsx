import Discussion from '@components/Discussion'
import ResponseLayout from '../ResponseLayout'

export default function DitForm() {
  return (
    <ResponseLayout redirectOnSuccess={false}>
      <Discussion />
    </ResponseLayout>
  )
}
