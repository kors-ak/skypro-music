export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const remainingSecondsAfterHours = seconds % 3600
  const minutes = Math.floor(remainingSecondsAfterHours / 60)
  const remainingSeconds = remainingSecondsAfterHours % 60

  const hoursPart = hours > 0 ? `${hours}:` : ''
  const minutesPart = hoursPart
    ? `${minutes.toString().padStart(2, '0')}:`
    : `${minutes}:`
  const secondsPart = remainingSeconds.toString().padStart(2, '0')

  return `${hoursPart}${minutesPart}${secondsPart}`
}
