import { gql } from 'urql'

export const collectionQuery = gql`
  query ($orgId: String!) {
    organisation(id: $orgId) {
      id
      organisationName
      organisationInfoFields
      organisationInfoDataTypes
      collections {
        id
        collectionName
        contract
        retired
        collectionInfoFields
        collectionInfoValues
      }
    }
  }
`
