import { gql } from 'urql'

export const collectionQuery = gql`
  query ($orgId: String!) {
    collections(where: { id: $orgId }) {
      id
      collectionName
      contract
      retired
    }
  }
`
