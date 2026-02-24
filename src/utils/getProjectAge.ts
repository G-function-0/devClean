

export function getAgeInDays(lastModified: Date): number {
  const now = new Date()
  const diff = now.getTime() - lastModified.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}