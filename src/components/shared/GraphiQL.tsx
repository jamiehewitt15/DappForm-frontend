import { useState, useEffect } from 'react'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.min.css'
import { fetch } from 'cross-fetch'

interface GraphiQLWrapperProps {
  url: string // URL of your GraphQL server
}

const GraphiQLWrapper: React.FC<GraphiQLWrapperProps> = ({ url }) => {
  // Define the fetcher type
  type Fetcher = (graphQLParams: any) => Promise<any>

  // Initialize fetcher with a default fetcher function
  const [fetcher, setFetcher] = useState<Fetcher>(
    () => async (graphQLParams: any) => {
      const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams)
      })
      return await response.json()
    }
  )

  // Update the fetcher if the URL changes
  useEffect(() => {
    const newFetcher: Fetcher = async (graphQLParams: any) => {
      const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams)
      })
      return await response.json()
    }

    setFetcher(() => newFetcher)
  }, [url])

  return <GraphiQL fetcher={fetcher} />
}

export default GraphiQLWrapper
