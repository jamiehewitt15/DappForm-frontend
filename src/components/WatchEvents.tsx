'use client'

import { useState } from 'react'
import type { Log } from 'viem'

import {
  useDatabaseCollectionCreatedEvent,
  useDatabaseOrganisationCreatedEvent
} from '@hooks/generated'

import { stringify } from '../utils/stringify'

export function WatchEvents() {
  const [orgLogs, setOrgLogs] = useState<Log[]>([])
  const [collectionLogs, setCollectionLogs] = useState<Log[]>([])

  useDatabaseOrganisationCreatedEvent({
    listener: (logs) => setOrgLogs((x) => [...x, ...logs])
  })

  useDatabaseCollectionCreatedEvent({
    listener: (logs) => setCollectionLogs((x) => [...x, ...logs])
  })

  return (
    <div>
      <details>
        <summary>{orgLogs.length} Organisations Created</summary>
        {orgLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details>
      <details>
        <summary>{orgLogs.length} Collection Created</summary>
        {collectionLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details>
    </div>
  )
}
