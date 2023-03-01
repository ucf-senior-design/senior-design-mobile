import React from "react"
import { API_URL } from "@env"
import { Event, Trip } from "../../../types/trip"

interface ChronologicalTrip extends Trip {
  index: number
}

interface TripUseState {
  trips: Map<string, ChronologicalTrip>
  selectedEvent: {
    uid: string
    joinableEvents: [Map<string, Event>]
    itinerary: [Map<string, Event>]
  }
}

interface TripContext {
  Trip: TripUseState
}
const TripContext = React.createContext<TripContext>({} as TripContext)

export default function useTrip(): TripContext {
  const context = React.useContext(TripContext)

  if (!context) {
    throw Error("useTrip must be used within an TripContext")
  }
  return context
}

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trip, setTrip] = React.useState<TripUseState>()

  /**
   * Gets basic information needed for the trip that are independent of the user viewing it in chronological order.
   */
  async function getBasicTripInfo() {
    // Do fetch request to get all the trips
    const response: Array<Trip> = []
    const trips = new Map<string, ChronologicalTrip>()

    response.forEach((trip, index) => {
      trips.set(trip.uid, { index: index, ...trip })
    })

    setTrip({
      ...trip,
      trips: trips,
    })
  }

  /**
   * Gets additional information such as joinable events for the user and the user's itinerary
   */
  async function handleViewingTrip(trip: Trip) {
    const tripDuration = Math.floor(
      (trip.duration.end.getTime() - trip.duration.start.getTime()) / (1000 * 3600 * 24),
    )

    const joinableEvents = Array(Math.max(1, tripDuration)).fill(new Map<string, Event>())
    const itineraryEvents = Array(Math.max(1, tripDuration)).fill(new Map<string, Event>())

    // fetch request to get events for trip
    await fetch(`${API_URL}trip/${trip.uid}/itinerary`, options)
    const responseEvents: Array<Event> = []

    // fetch request to get joinable events for trip
    const responseJoinable: Array<Event> = []

    responseEvents.forEach((event) => {
      const index = Math.floor(
        (event.duration.start.getTime() - trip.duration.start.getTime()) / (1000 * 3600 * 24),
      )

      itineraryEvents[index].set(event.uid, event)
    })

    responseJoinable.forEach((event) => {
      const index = Math.floor(
        (event.duration.start.getTime() - trip.duration.start.getTime()) / (1000 * 3600 * 24),
      )

      joinableEvents[index].set(event.uid, event)
    })
  }
}
