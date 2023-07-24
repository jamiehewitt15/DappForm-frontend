import { useState, ReactElement } from 'react'
import { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import Connected from '@components/shared/Connected'
import NotConnected from '@components/shared/NotConnected'
import WrongNetwork from '@components/shared/WrongNetwork'
import { ConnectButton } from '@rainbow-me/rainbowkit'
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
  FormControl,
  InputLabel,
  IconButton,
  Switch,
  FormControlLabel
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import LinearProgressWithLabel from './LinearProgressWithLabel'

interface Datatype {
  type: string
  value: number
}

export default function Onboarding(): ReactElement {
  const [progress, setProgress] = useState<number>(0)
  const [orgName, setOrgName] = useState<string>('')
  const [fields, setFields] = useState<string[]>(['field-1'])
  const [collectionName, setCollectionName] = useState<string>('')
  const [collectionInfoValues, setCollectionInfoValues] = useState<string[]>()
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [fieldDataTypes, setFieldDataTypes] = useState<number[]>([])
  const [addPublishers, setAddPublishers] = useState<boolean>(false)
  const [publishers, setPublishers] = useState<string[]>([
    '0x0000000000000000000000000000000000000000'
  ])
  console.log('fieldnames', fieldNames)
  console.log('fieldDataTypes', fieldDataTypes)
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

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  const handleRemoveField = (i) => {
    // Create a new array without the item at index i
    const newFields = fields.filter((_, index) => index !== i)
    const newFieldNames = fieldNames.filter((_, index) => index !== i)
    const newFieldDataTypes = fieldDataTypes.filter((_, index) => index !== i)
    // Update the state with the new array
    setFields(newFields)
    setFieldNames(newFieldNames)
    setFieldDataTypes(newFieldDataTypes)
  }

  return (
    <Paper elevation={3}>
      <Container sx={{ p: 2 }}>
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
              sx={{ mr: 4, mb: 2 }}
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
                <FormControl sx={{ mb: 2, minWidth: 180 }}>
                  <TextField
                    label={'Field ' + (i + 1) + ' Name'}
                    onChange={(e) => {
                      // Ensure fieldNames is an array before trying to spread it.
                      const currentFieldNames = Array.isArray(fieldNames)
                        ? fieldNames
                        : []
                      const updatedFieldNames = [...currentFieldNames]
                      updatedFieldNames[i] = e.target.value
                      setFieldNames(updatedFieldNames)
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
                    label="Field x  Data Type"
                    onChange={(e) => {
                      const currentFieldNames = Array.isArray(fieldDataTypes)
                        ? fieldDataTypes
                        : []
                      const updatedFieldTypes = [...currentFieldNames]
                      updatedFieldTypes[i] = Number(e.target.value)
                      setFieldDataTypes(updatedFieldTypes)
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
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={(e) => {
                    handleRemoveField(i)
                  }}
                >
                  <DeleteIcon fontSize="medium" />
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
            <h3>Can anyone publish in this collection?</h3>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label={
                addPublishers
                  ? 'Only approved addresses can publish'
                  : 'Anyone can publish within this collection'
              }
              onClick={(e) => {
                setAddPublishers(!addPublishers)
              }}
            />
          </Box>
          {addPublishers && (
            <>
              <Divider />
              <Box sx={{ m: 2 }}>
                <h3>Would you like to add some publishers now?</h3>
                <TextField
                  label="Publisher address 1"
                  helperText="You can also do this later"
                />
              </Box>
            </>
          )}

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
