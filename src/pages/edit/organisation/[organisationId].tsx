import { useState, useEffect, ReactElement } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Connected from '@components/shared/Connected'
import NotConnected from '@components/shared/NotConnected'
import WrongNetwork from '@components/shared/WrongNetwork'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { orgInfoFields, orgInfoDataTypes } from '@constants/InfoConstants'
import { stringify, convertStringToHex } from '@utils/index'
import {
  useDecentraDbOrgCreationFee as updateFee,
  useDecentraDbCreateOrUpdateOrganisation as updateOrg,
  usePrepareDecentraDbCreateOrUpdateOrganisation as prepareUpdateOrg,
  useDecentraDbOrganisationCreatedOrUpdatedEvent as orgUpdated
} from '@hooks/generated'
import {
  Box,
  TextField,
  Divider,
  Button,
  Paper,
  Container
} from '@mui/material'
import LinearProgressWithLabel from '@components/shared/LinearProgressWithLabel'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { organisationQuery } from '@queries/organisation'

export default function Onboarding(): ReactElement {
  const router = useRouter()
  const [progress, setProgress] = useState<number>(0)
  const [orgName, setOrgName] = useState<string>('')
  const [orgWebsite, setOrgWebsite] = useState<string>('')
  const [orgInfoValues, setOrgInfoValues] = useState<string[]>([''])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [orgLogs, setOrgLogs] = useState<any[]>([])
  const [orgId, setOrgId] = useState<string>()
  const [hexOrgId, setHexOrgId] = useState<string>('')

  useEffect(() => {
    if (router.isReady && router.query.organisationId) {
      setOrgId(router.query.organisationId as string)
      const hexId = convertStringToHex(router.query.organisationId)
      setHexOrgId(String(hexId))
    }
  }, [router.query.organisationId])

  const fee = updateFee().data

  orgUpdated({
    listener: (logs) => {
      console.log('logs', logs)
      console.log('Args', logs[0].args)
      // setCollectionId(Number(logs[0].args.organisationId))
      setOrgLogs((x) => [...x, ...logs])
    }
  })

  const { config } = prepareUpdateOrg({
    args: [
      orgId,
      orgName,
      orgInfoFields,
      orgInfoDataTypes,
      orgInfoValues,
      true,
      false
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } = updateOrg(config)

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  console.log('hexOrgId', hexOrgId)
  const [result] = useQuery({
    query: organisationQuery,
    variables: { orgId: hexOrgId }
  })

  const { data: queryData, fetching, error: queryError } = result

  useEffect(() => {
    console.log(
      'useEffect',
      queryData,
      queryData?.organisation?.organisationName
    )
    if (queryData) {
      setOrgName(queryData?.organisation?.organisationName)
      setOrgWebsite(queryData?.organisation?.organisationInfoValues?.[0])
    }
  }, [queryData, result, hexOrgId])

  if (fetching || !orgName) return <p>Loading...</p>
  if (queryError) return <p>Oh no there was an error... {error.message}</p>
  if (!queryData)
    return (
      <p>
        If this is a new organisation you will need to wait a few minutes before
        it is visible...
      </p>
    )
  console.log('queryData', queryData)
  console.log('orgName', orgName)
  console.log('orgWebsite', orgWebsite)

  return (
    <Paper elevation={3}>
      <Container sx={{ p: 2 }}>
        {!isSuccess && (
          <>
            <LinearProgressWithLabel value={progress} />
            <form
              onSubmit={(e) => {
                e.preventDefault()
                write?.()
              }}
            >
              <Box sx={{ m: 2 }}>
                <h3>Update your organisation</h3>
                <TextField
                  required
                  id="outlined-required"
                  label="Organisation Name"
                  defaultValue={orgName}
                  onChange={(e) => {
                    setOrgName(e.target.value)
                  }}
                  onBlur={() => {
                    progress <= 80 && setProgress(progress + 20)
                  }}
                  sx={{ mr: 4, mb: 2 }}
                />
                <TextField
                  placeholder="Organisation Website"
                  label="Website"
                  defaultValue={orgWebsite}
                  onChange={(e) => {
                    setOrgInfoValues([e.target.value])
                  }}
                  onBlur={() => {
                    progress <= 80 && setProgress(progress + 20)
                  }}
                />
              </Box>

              <Divider />

              <Box sx={{ mb: 2 }}>
                <h3>Finally you need to sign a transaction to complete</h3>
                <NotConnected>
                  <ConnectButton />
                </NotConnected>

                <Connected>
                  <WrongNetwork>
                    <Button
                      disabled={!write}
                      type="submit"
                      variant="contained"
                      onSubmit={(e) => {
                        e.preventDefault()
                        write?.()
                      }}
                    >
                      Create
                    </Button>
                  </WrongNetwork>
                </Connected>
              </Box>
            </form>
          </>
        )}

        {isLoading && <div>Check wallet...</div>}
        {isPending && <div>Transaction pending...</div>}
        {isSuccess && (
          <>
            <h3>Success!</h3>
            <div>Your organisation has been updated!</div>
            <div>
              Event details: <details>{stringify(orgLogs[0], null, 2)}</details>
              {/* <Button
                type="button"
                variant="contained"
                onClick={() => router.push('/' + orgId)}
              >
                View Organisation
              </Button> */}
            </div>
          </>
        )}
        {isError && <div>{(error as BaseError)?.shortMessage}</div>}
      </Container>
    </Paper>
  )
}
