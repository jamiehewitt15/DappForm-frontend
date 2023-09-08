import { gql } from 'urql'

export const collectionQuery = gql`
  query ($orgId: String!, $collectionId: String!) {
    organisation(id: $orgId) {
      collections(where: { id: $collectionId }) {
        fieldNames
        fieldDataTypes
      }
    }
  }
`
