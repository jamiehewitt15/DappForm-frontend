import { createClient, Provider, Client, fetchExchange } from 'urql'
import { refocusExchange } from '@urql/exchange-refocus'
import React, { useState, useEffect, ReactNode, ReactElement } from 'react'

let urqlClient: Client

function createUrqlClient(subgraphUri: string) {
  const client = createClient({
    url: subgraphUri,
    exchanges: [refocusExchange(), fetchExchange]
  })
  return client
}

export function getUrqlClientInstance(): Client {
  return urqlClient
}

export default function UrqlProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  //
  // Set a default client here based on ETH Mainnet, as that's required for
  // urql to work.
  // Throughout code base this client is then used and altered by passing
  // a new queryContext holding different subgraph URLs.
  //
  const [client, setClient] = useState<Client>()

  useEffect(() => {
    const newClient = createUrqlClient(process.env.NEXT_PUBLIC_SUBGRAPH_URI)
    urqlClient = newClient
    setClient(newClient)
  }, [])

  return client ? <Provider value={client}>{children}</Provider> : <></>
}
