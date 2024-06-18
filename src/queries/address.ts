import { gql } from 'urql'

export const addressQuery = gql`
  query ($transactionFrom: String!) {
    organisations(where: { transactionFrom: $transactionFrom }) {
      id
      organisationName
      organisationInfoFields
      organisationInfoDataTypes
      organisationInfoValues
      collectionCount
      contract
      retired
      blockNumber
      blockTimestamp
      transactionHash
      transactionFrom
      transactionTo
      transactionGasLimit
      transactionGasPrice
      transactionValue
    }
  }
`
