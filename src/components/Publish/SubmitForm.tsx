import { ReactElement, ReactNode } from 'react'
import Form from '@components/FormElements'
import {
  useAltBaseGetFees as getFees,
  usePrepareAltBasePublishOrUpdateDocument as prepareDocument
} from '@hooks/generated'
import { useFormContext } from '@context/FormContext'

export default function SubmitForm({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { fieldNames, fieldDataTypes, orgId, collectionId } = useFormContext()

  // TODO: at some point we will want to allow users to update their form responses
  const documentStatus = {
    update: false,
    retired: false
  }

  const allFees = getFees().data
  const fee = allFees ? allFees[2] : undefined

  const { config } = prepareDocument({
    args: [
      {
        documentId: 0,
        organisationId: orgId,
        collectionId: collectionId,
        fieldNames: fieldNames,
        fieldDataTypes: fieldDataTypes,
        fieldValues: [],
        status: documentStatus
      }
    ],
    value: fee
  })

  return (
    <Form successPath={'/organisation/' + orgId} config={config}>
      {children}
    </Form>
  )
}
