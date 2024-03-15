import { useRouter } from 'next/router'

export function paramToInt(value: string | string[]): number {
  if (Array.isArray(value)) {
    return parseInt(value[0], 10)
  } else if (value) {
    return parseInt(value, 10)
  } else {
    console.warn('No parameter found.')
  }
}

export function convertStringToHex(stringParam: string | string[]): string {
  const num = paramToInt(stringParam)

  if (isNaN(num)) {
    throw new Error('Invalid input: not a number')
  }
  const hexNum = '0x' + num.toString(16) // Convert the number to its hexadecimal representation
  return hexNum
}

export function checkUrlPath(): string | null {
  const router = useRouter()
  const path = router.asPath

  const keywords = ['document', 'collection', 'organisation']

  for (const keyword of keywords) {
    if (path.includes(keyword)) {
      return keyword
    }
  }

  return null
}
