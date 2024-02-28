import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
  FunctionComponent
} from 'react'

// Define the context type
interface ColorContextType {
  userThemeColor: string
  setUserThemeColor: (color: string) => void
  userBackgroundColor: string
  setUserBackgroundColor: (color: string) => void
}

// Create a context with a default value that matches the type
const ColorContext = createContext<ColorContextType | undefined>(undefined)

export const useColors = (): ColorContextType => {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider')
  }
  return context
}

// Define the props type for ColorProvider to include children of type ReactNode
interface ColorProviderProps {
  children: ReactNode
}

const ColorProvider: FunctionComponent<ColorProviderProps> = ({ children }) => {
  const [userThemeColor, setUserThemeColor] = useState<string>('#ff0000')
  const [userBackgroundColor, setUserBackgroundColor] =
    useState<string>('#ffffff')

  return (
    <ColorContext.Provider
      value={{
        userThemeColor,
        setUserThemeColor,
        userBackgroundColor,
        setUserBackgroundColor
      }}
    >
      {children}
    </ColorContext.Provider>
  )
}

export default ColorProvider
