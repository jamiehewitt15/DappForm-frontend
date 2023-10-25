import { gql } from 'urql'

export const organisationQuery = gql`
  query ($orgId: String!) {
    organisation(id: $orgId) {
      organisationName
      organisationInfoFields
      organisationInfoDataTypes
      organisationInfoValues
    }
  }
`
