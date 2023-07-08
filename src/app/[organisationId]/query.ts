import { gql } from 'urql'

export const collectionQuery = gql`
  query ($orgId: String!) {
    organisation(id: "0x1") {
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
