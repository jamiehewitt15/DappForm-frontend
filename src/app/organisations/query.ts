import { gql } from 'urql'

export const orgQuery = gql`
  query {
    organisations {
      id
      organisationName
      retired
      contract
    }
  }
`
