export function lightenColor(hex: string, factor: number): string {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)

  const newR = Math.round(r + (255 - r) * factor).toString(16)
  const newG = Math.round(g + (255 - g) * factor).toString(16)
  const newB = Math.round(b + (255 - b) * factor).toString(16)

  return `#${newR.padStart(2, '0')}${newG.padStart(2, '0')}${newB.padStart(
    2,
    '0'
  )}`
}
