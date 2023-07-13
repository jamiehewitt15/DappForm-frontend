import { gql } from 'urql'

export const collectionQuery = gql`
  query ($orgId: String!) {
    organisation(id: $orgId) {
      id
      organisationName
      organisationInfoFields
      organisationInfoDataTypes
    }
    collections(where: { id: $orgId }) {
      id
      collectionName
      contract
      retired
      collectionInfoFields
      collectionInfoValues
    }
  }
`
