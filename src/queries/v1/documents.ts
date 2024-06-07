import { gql } from 'urql'

export const documentsQuery = gql`
  query ($collectionId: String!) {
    collection(id: $collectionId) {
      collectionName
      organisation {
        organisationName
      }
      fields {
        fieldName
      }
      documents {
        id
        fieldNames
        fieldDataTypes
        fieldValues
        retired
        blockTimestamp
        owner
        blockNumber
        transactionHash
        transactionFrom
      }
    }
  }
`
