import { gql } from 'urql'

export const collectionQuery = gql`
  query ($collectionId: String!) {
    collection(id: $collectionId) {
      id
      collectionName
      collectionInfoFields
      collectionInfoDataTypes
      collectionInfoValues
      uniqueDocumentPerAddress
      restrictedPublishing
      fields {
        index
        collectionVersion
        fieldName
        fieldDataType
        fieldOptions
        required
      }
    }
  }
`
