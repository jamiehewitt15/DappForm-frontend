// src/context/DeviceContext.tsx
import {
  createContext,
  useContext,
  useState,
  FunctionComponent,
  ReactNode
} from 'react'

interface SubmitContextProps {
  write: () => void
  setWrite: (value: any) => void
  buttonText: string
  setButtonText: (value: any) => void
  isLoading: any
  setIsLoading: (value: any) => void
  isPending: any
  setIsPending: (value: any) => void
  isIndexing?: boolean
  setIsIndexing: (value: any) => void
  isSuccess: boolean
  setIsSuccess: (value: any) => void
}

const SubmitContext = createContext<SubmitContextProps | undefined>(undefined)

export const SubmitProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const [write, setWrite] = useState<() => void>()
  const [buttonText, setButtonText] = useState('')
  const [isLoading, setIsLoading] = useState()
  const [isPending, setIsPending] = useState()
  const [isIndexing, setIsIndexing] = useState()
  const [isSuccess, setIsSuccess] = useState(false)

  const contextValues = {
    write,
    setWrite,
    buttonText,
    setButtonText,
    isLoading,
    setIsLoading,
    isPending,
    setIsPending,
    isIndexing,
    setIsIndexing,
    isSuccess,
    setIsSuccess
  }

  return (
    <SubmitContext.Provider value={contextValues}>
      {children}
    </SubmitContext.Provider>
  )
}

export const useSubmit = (): SubmitContextProps => {
  const context = useContext(SubmitContext)
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}
