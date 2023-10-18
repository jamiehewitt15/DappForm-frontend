import { gql } from 'urql'

export const collectionQuery = gql`
  query ($orgId: String!, $collectionId: String!) {
    organisation(id: $orgId) {
      id
      collections(where: { id: $collectionId }) {
        collectionName
        fieldNames
        fieldDataTypes
      }
    }
  }
`
