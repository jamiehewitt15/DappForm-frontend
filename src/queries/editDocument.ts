import { gql } from 'urql'

export const collectionQuery = gql`
  query ($orgId: String!, $collectionId: String!, $documentId: String!) {
    organisation(id: $orgId) {
      id
      collections(where: { id: $collectionId }) {
        collectionName
        fieldNames
        fieldDataTypes
        documents(where: { id: $documentId }) {
          fieldValues
        }
      }
    }
  }
`