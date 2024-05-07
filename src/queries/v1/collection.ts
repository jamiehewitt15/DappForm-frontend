import { gql } from 'urql'

export const collectionQuery = gql`
  query ($collectionId: String!) {
    collection(id: $collectionId) {
      organisation {
        id
        organisationName
      }
      id
      collectionName
      description
      userThemeColor
      collectionInfoFields
      collectionInfoDataTypes
      collectionInfoValues
      uniqueDocumentPerAddress
      restrictedPublishing
      fields {
        id
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
