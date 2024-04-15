import { customFonts } from '@constants/Fonts'
import { grass } from '@radix-ui/colors'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent
} from 'react'

interface UserThemeContextType {
  userThemeColor: string
  setUserThemeColor: (color: string) => void
  userBackgroundColor: string
  setUserBackgroundColor: (color: string) => void
  font: string
  setFont: (font: string) => void
}

// Create a context with a default value that matches the type
const UserThemeContext = createContext<UserThemeContextType | undefined>(
  undefined
)

export const useUserTheme = (): UserThemeContextType => {
  const context = useContext(UserThemeContext)
  if (context === undefined) {
    throw new Error('useUserTheme must be used within a ColorProvider')
  }
  return context
}

// Define the props type for ColorProvider to include children of type ReactNode
interface ColorProviderProps {
  children: ReactNode
}

const UserThemeProvider: FunctionComponent<ColorProviderProps> = ({
  children
}) => {
  const [userThemeColor, setUserThemeColor] = useState<string>('#4DA06D')
  const [userBackgroundColor, setUserBackgroundColor] =
    useState<string>('#ffffff')
  const [font, setFont] = useState(customFonts[0].stack)

  return (
    <UserThemeContext.Provider
      value={{
        userThemeColor,
        setUserThemeColor,
        userBackgroundColor,
        setUserBackgroundColor,
        font,
        setFont
      }}
    >
      {children}
    </UserThemeContext.Provider>
  )
}

export default UserThemeProvider
