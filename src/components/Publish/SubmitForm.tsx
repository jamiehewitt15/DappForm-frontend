import { ReactElement, ReactNode } from 'react'
import FormTemplate from '@components/FormElements/FormTemplate'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBasePublishOrUpdateDocument as prepareDocument,
  useAltBasePublishOrUpdateDocument as publishDocument,
  useAltBaseDocumentEvent as DocumentCreated
} from '@hooks/generated'
import { useFormContext } from '@context/FormContext'

export default function SubmitForm({
  children,
  redirectOnSuccess = true
}: {
  children: ReactNode
  redirectOnSuccess?: boolean
}): ReactElement {
  const {
    fieldNames,
    fieldDataTypes,
    orgId,
    collectionId,
    formResponses,
    setCreatingOrEditing
  } = useFormContext()

  DocumentCreated({
    listener: (logs) => {
      if (logs[0].args.collectionId) {
        const id = Number(logs[0].args.documentId)
        console.log('Document created with ID:', id)

        setCreatingOrEditing(false)
      }
    }
  })

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

  const { config } = prepareDocument({
    args: [documentParams],
    value: fee
  })

  const { write, data, error, isLoading, isError } = publishDocument(config)

  return (
    <FormTemplate
      successPath={redirectOnSuccess ? '/responses/' : undefined}
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
