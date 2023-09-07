export function convertStringToHex(stringParam: string | string[]): string {
  let num: number
  if (Array.isArray(stringParam)) {
    console.warn(
      'Received multiple organisationId parameters. Using the first one.'
    )
    num = parseInt(stringParam[0], 10)
  } else if (stringParam) {
    num = parseInt(stringParam, 10)
  } else {
    console.warn('No organisationId parameter found.')
  }

  if (isNaN(num)) {
    throw new Error('Invalid input: not a number')
  }
  const hexNum = '0x' + num.toString(16) // Convert the number to its hexadecimal representation
  return hexNum
}
