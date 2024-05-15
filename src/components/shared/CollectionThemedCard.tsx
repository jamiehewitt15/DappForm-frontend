import { ReactElement, useEffect } from 'react'
import { Card } from '@mui/material'
import { useFormContext } from '@context/FormContext'

export default function CollectionThemedCard({
  children,
  color
}: {
  children?: ReactElement
  color?: string
}): ReactElement {
  const { userThemeColor, userBackgroundColor } = useFormContext()

  useEffect(() => {
    document.body.style.backgroundColor = userBackgroundColor

    // Cleanup function to reset the background color
    return () => {
      document.body.style.backgroundColor = '' // Reset to default or previous value
    }
  }, [userBackgroundColor])

  const highlightColor = color ? color : userThemeColor

  return (
    <Card
      sx={{
        borderTop: `10px solid ${highlightColor}`,
        marginBottom: 4,
        borderRadius: '8px',
        position: 'relative'
      }}
    >
      {children}
    </Card>
  )
}
