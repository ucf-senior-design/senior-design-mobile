import { Duration } from "../../types/trip"

export function locationToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export function getDate(date: Date, year: boolean) {
  if (year) return date.toLocaleDateString([], { year: "numeric", month: "long", day: "2-digit" })
  else return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

export function getTime(date: Date) {
  // Need to check for minute rather than just put hour
  return date.toLocaleTimeString("en-US", { hour: "2-digit" })
}

export function getDuration(duration: Duration) {
  // Need to check for minute rather than just put hour
  return (
    duration.start.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" }) +
    " - " +
    duration.end.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })
  )
}
