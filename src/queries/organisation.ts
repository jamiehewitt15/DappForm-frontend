import { gql } from 'urql'

export const organisationQuery = gql`
  query ($orgId: String!) {
    organisation(id: $orgId) {
      organisationName
      collections {
        id
        collectionName
        description
        userThemeColor
        userBackgroundColor
        font
        collectionType
        documentCount
        retired
        blockTimestamp
      }
    }
  }
`
