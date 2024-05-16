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
        documentCount
        retired
        blockTimestamp
      }
    }
  }
`
