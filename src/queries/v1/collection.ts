import { gql } from 'urql'

export const collectionQuery = gql`
  query ($collectionId: String!) {
    collections(where: { id: $collectionId }) {
      collectionName
      collectionInfoValues
      collectionInfoFields

      documents {
        id
        contract
        retired
        fieldNames
        fieldValues
        fieldDataTypes
      }
    }
  }
`
