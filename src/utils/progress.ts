export function increaseProgress(
  currentProgress: number,
  totalSteps: number
): number {
  if (currentProgress >= 99 || totalSteps <= 0) {
    return 99
  }

  // Calculate the base increment factor based on total steps
  const baseIncrement = 99 / totalSteps

  // Apply some adjustment to make the progress move quicker
  // The more we are away from 99, the less aggressive the slowing will be.
  let adjustedIncrement =
    baseIncrement - Math.sqrt(100 / (100 - currentProgress))

  // If progress is above 80, make the slowing more aggressive
  if (currentProgress + adjustedIncrement > 80) {
    adjustedIncrement = adjustedIncrement / ((totalSteps + 1) / 2)
  }

  // Calculate new progress
  const newProgress = currentProgress + adjustedIncrement

  // Cap the progress at 99
  return newProgress >= 99 ? 99 : newProgress
}
