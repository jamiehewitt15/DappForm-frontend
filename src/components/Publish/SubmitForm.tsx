import { ReactElement, ReactNode } from 'react'
import FormTemplate from '@components/FormElements/FormTemplate'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBasePublishOrUpdateDocument as prepareDocument,
  useAltBasePublishOrUpdateDocument as publishDocument
} from '@hooks/generated'
import { useFormContext } from '@context/FormContext'

export default function SubmitForm({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { fieldNames, fieldDataTypes, orgId, collectionId, formResponses } =
    useFormContext()

  // TODO: at some point we will want to allow users to update their form responses
  const documentStatus = {
    update: false,
    retired: false
  }

  const allFees = getFees().data
  const fee = allFees ? allFees[2] : undefined

  const documentParams = {
    documentId: 0,
    organisationId: orgId,
    collectionId: collectionId,
    fieldNames: fieldNames,
    fieldDataTypes: fieldDataTypes,
    fieldValues: formResponses,
    status: documentStatus
  }

  console.log('documentParams', documentParams)

  const { config } = prepareDocument({
    args: [documentParams],
    value: fee
  })

  const { write, data, error, isLoading, isError } = publishDocument(config)

  console.log('publish document write: ', write)
  console.log('publish document data: ', data)
  console.log('publish document error: ', error)
  console.log('publish document isLoading: ', isLoading)
  console.log('publish document isError: ', isError)

  return (
    <FormTemplate
      successPath={'/organisation/' + orgId}
      buttonText="Submit Response"
      write={write}
      data={data}
      error={error}
      isLoading={isLoading}
      isError={isError}
    >
      {children}
    </FormTemplate>
  )
}
