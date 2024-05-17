import { ReactElement, ReactNode } from 'react'
import { useDevice } from '@context/DeviceContext'

export default function DeviceRender({
  children,
  device
}: {
  children: ReactNode
  device: 'phone' | 'tablet' | 'desktop'
}): ReactElement {
  const { deviceType } = useDevice()
  console.log('Form template device type: ', deviceType)
  // only render children if the deices match
  return deviceType === device ? <>{children}</> : null
}
