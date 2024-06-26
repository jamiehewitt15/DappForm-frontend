// src/context/DeviceContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  FunctionComponent,
  ReactNode
} from 'react'

type DeviceType = 'phone' | 'tablet' | 'desktop'

interface DeviceContextProps {
  deviceType: DeviceType
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined)

export const DeviceProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType('phone')
      } else if (width >= 768 && width <= 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  return (
    <DeviceContext.Provider value={{ deviceType }}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevice = (): DeviceContextProps => {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}
