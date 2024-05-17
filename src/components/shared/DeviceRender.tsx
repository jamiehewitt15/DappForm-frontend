import { ReactElement, ReactNode } from 'react'
import { useDevice } from '@context/DeviceContext'

export default function DeviceRender({
  children,
  devices
}: {
  children: ReactNode
  devices: Array<'phone' | 'tablet' | 'desktop'>
}): ReactElement {
  const { deviceType } = useDevice()
  console.log('Form template device type: ', deviceType)

  // only render children if the deviceType is in the devices array
  return devices.includes(deviceType) ? <>{children}</> : null
}
