export function paramToInt(value: string | string[]): number {
  console.log('paramToInt value', value)
  if (Array.isArray(value)) {
    console.warn('Received multiple parameters. Using the first one.')
    return parseInt(value[0], 10)
  } else if (value) {
    return parseInt(value, 10)
  } else {
    console.warn('No parameter found.')
  }
}

export function convertStringToHex(stringParam: string | string[]): string {
  console.log('convertStringToHex stringParam', stringParam)
  const num = paramToInt(stringParam)

  if (isNaN(num)) {
    throw new Error('Invalid input: not a number')
  }
  const hexNum = '0x' + num.toString(16) // Convert the number to its hexadecimal representation
  return hexNum
}
