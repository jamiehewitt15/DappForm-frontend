'use client'

import { useState } from 'react'
import type { Log } from 'viem'

import {
  useDatabaseCollectionCreatedEvent,
  useDatabaseOrganisationCreatedEvent,
  useDatabaseDocumentPublishedEvent
} from '@hooks/generated'

import { stringify } from '../utils/stringify'

export function WatchEvents() {
  const [orgLogs, setOrgLogs] = useState<Log[]>([])
  const [collectionLogs, setCollectionLogs] = useState<Log[]>([])
  const [documentLogs, setDocumentLogs] = useState<Log[]>([])

  useDatabaseOrganisationCreatedEvent({
    listener: (logs) => setOrgLogs((x) => [...x, ...logs])
  })
  useDatabaseCollectionCreatedEvent({
    listener: (logs) => setCollectionLogs((x) => [...x, ...logs])
  })
  useDatabaseDocumentPublishedEvent({
    listener: (logs) => setDocumentLogs((x) => [...x, ...logs])
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
        <summary>{collectionLogs.length} Collection Created</summary>
        {collectionLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details>
      <details>
        <summary>{documentLogs.length} Document Created</summary>
        {documentLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details>
    </div>
  )
}
