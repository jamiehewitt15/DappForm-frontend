import { ReactElement, ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { useUserTheme } from '@context/ThemeSelectorContext'

export default function UserThemeProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { font, userThemeColor } = useUserTheme()

  // Create a theme instance with the selected font
  const theme = createTheme({
    palette: {
      primary: {
        main: `${userThemeColor}`
      },
      secondary: {
        main: `${userThemeColor}`
      }
    },
    typography: {
      fontFamily: font,
      // Apply the font family to all heading variants
      h1: { fontFamily: font },
      h2: { fontFamily: font },
      h3: { fontFamily: font },
      h4: { fontFamily: font },
      h5: { fontFamily: font },
      h6: { fontFamily: font },
      subtitle1: { fontFamily: font },
      subtitle2: { fontFamily: font },
      body1: { fontFamily: font },
      body2: { fontFamily: font }
      // Add other variants as needed
    }
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
