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
  Container,
  LinearProgress,
  LinearProgressProps,
  Typography,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Datatype {
  type: string
  value: number
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

export function CreateOrgAndCollection() {
  const [progress, setProgress] = useState<number>(0)
  const [orgName, setOrgName] = useState<string>('')
  const [orgInfoValues, setOrgInfoValues] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])
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
        <LinearProgressWithLabel value={progress} />
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
              onBlur={(e) => {
                progress <= 80 && setProgress(progress + 20)
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
              onBlur={(e) => {
                progress <= 80 && setProgress(progress + 20)
              }}
              sx={{ mr: 4 }}
            />
            <TextField
              placeholder="Collection Description"
              label="Collection Description"
              onChange={(e) => {
                setCollectionInfoValues([e.target.value])
              }}
              onBlur={(e) => {
                progress <= 80 && setProgress(progress + 20)
              }}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <h4>Here you can define the schema for your collection</h4>

            {fields.map((field, i) => (
              <div key={field}>
                <FormControl>
                  <InputLabel id="select-label">Field {i + 1} Name</InputLabel>
                  <TextField
                    onChange={(e) => {
                      setFieldNames([e.target.value])
                    }}
                    onBlur={(e) => {
                      progress <= 80 && setProgress(progress + 20)
                    }}
                    sx={{ mr: 4 }}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2, minWidth: 180 }}>
                  <InputLabel id="select-label">
                    Field {i + 1} Data Type
                  </InputLabel>
                  <Select
                    labelId="select-input"
                    id="select"
                    label="Data Type"
                    onChange={(e) => {
                      setFieldDataTypes([Number(e.target.value)])
                    }}
                    onBlur={(e) => {
                      progress <= 80 && setProgress(progress + 20)
                    }}
                  >
                    {datatypes.map((datatype: Datatype) => (
                      <MenuItem value={datatype.value}>
                        {datatype.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            ))}

            <br />
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                const newFields = fields.concat([
                  'field-' + (fields.length + 1)
                ])
                setFields(newFields)
              }}
            >
              Add an extra field
            </Button>
          </Box>
          <Divider />
          <Box sx={{ m: 2 }}>
            <h3>Would you like to add some publishers?</h3>
            <TextField
              label="Publishers"
              helperText="You can also do this later"
            />
          </Box>
          <Divider />

          <Box sx={{ mb: 2 }}>
            <h3>Finally you need to sign a transaction to complete</h3>
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
