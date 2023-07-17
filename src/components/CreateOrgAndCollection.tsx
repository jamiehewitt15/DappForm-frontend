import { useState } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import {
  orgInfoFields,
  orgInfoDataTypes,
  collectionInfoFields,
  collectionInfoDataTypes
} from '@constants/InfoConstants'
import datatypes from '@constants/datatypes.json'
import { stringify } from '@utils/stringify'
import {
  useDecentraDbOrgCreationFee,
  useDecentraDbCollectionCreationFee,
  useDecentraDbCreateOrganisationAndCollectionAndAddRoles as createOrg,
  usePrepareDecentraDbCreateOrganisationAndCollectionAndAddRoles as prepareCreateOrg
} from '@hooks/generated'
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Divider,
  Button,
  Paper,
  Container
} from '@mui/material'

interface Datatype {
  type: string
  value: number
}

export function CreateOrgAndCollection() {
  const [orgName, setOrgName] = useState<string>('')
  const [orgInfoValues, setOrgInfoValues] = useState<string[]>([])
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>()
  const [fieldNames, setFieldNames] = useState<string[]>()
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>()
  const [publishers, setPublishers] = useState<string[]>([
    '0x0000000000000000000000000000000000000000'
  ])

  const orgFee = useDecentraDbOrgCreationFee().data
  const collectionFee = useDecentraDbCollectionCreationFee().data
  const fee = orgFee && collectionFee ? orgFee + collectionFee : undefined

  const { config } = prepareCreateOrg({
    args: [
      orgName,
      orgInfoFields,
      orgInfoDataTypes,
      ['0'],
      collectionName,
      collectionInfoFields,
      collectionInfoDataTypes,
      collectionInfoValues,
      fieldNames,
      fieldDataTypes,
      publishers
    ],
    value: fee
  })
  const { write, data, error, isLoading, isError } = createOrg(config)
  console.log('data', data)
  console.log('fieldDataTypes', fieldDataTypes)
  console.log('fieldNames', fieldNames)
  console.log('write', write)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <Paper elevation={3}>
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            write?.()
          }}
        >
          <Box sx={{ m: 2 }}>
            <h3>What's the name of your organisation?</h3>
            <TextField
              required
              id="outlined-required"
              label="Organisation Name"
              placeholder="Your organisation Name"
              onChange={(e) => {
                setOrgName(e.target.value)
              }}
            />
          </Box>
          <Divider />
          <Box sx={{ m: 2 }}>
            <h3>Now let's define your first collection</h3>
            <TextField
              required
              id="outlined-required"
              label="Collection Name"
              placeholder="Your organisation Name"
              onChange={(e) => {
                setCollectionName(e.target.value)
              }}
            />

            <TextField
              placeholder="Collection Description"
              onChange={(e) => {
                setCollectionInfoValues([e.target.value])
              }}
            />
            <TextField
              placeholder="Collection Field Name"
              onChange={(e) => {
                setFieldNames([e.target.value])
              }}
            />

            <Select
              labelId="select-label"
              id="select"
              label="Field 1 Data Type"
              onChange={(e) => {
                setFieldDataTypes([Number(e.target.value)])
              }}
            >
              {datatypes.map((datatype: Datatype) => (
                <MenuItem value={datatype.value}>{datatype.type}</MenuItem>
              ))}
            </Select>
          </Box>
          <Divider />
          <Box>
            <h4>Would you like to add some publishers?</h4>
            <TextField
              placeholder="Publishers"
              helperText="You can also do this later"
            />
          </Box>
          <Divider />

          <Box sx={{ m: 2 }}>
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
            <button disabled={!write} type="submit">
              Create
            </button>
          </Box>
        </form>

        {isLoading && <div>Check wallet...</div>}
        {isPending && <div>Transaction pending...</div>}
        {isSuccess && (
          <>
            <div>Transaction Hash: {data?.hash}</div>
            <div>
              Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
            </div>
          </>
        )}
        {isError && <div>{(error as BaseError)?.shortMessage}</div>}
      </Container>
    </Paper>
  )
}
