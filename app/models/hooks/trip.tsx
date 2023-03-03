import React from "react"
import { API_URL } from "@env"
import { Event, SuggestionWidget, Trip } from "../../../types/trip"
import { createFetchRequestOptions } from "../../utils/fetch"

interface TripUseState extends Trip {
  suggestions: Map<string, SuggestionWidget>
  joinableEvents: Array<Array<Event>>
  itinerary: Array<Array<Event>>
}

interface TripContext {
  trip: TripUseState
  initilizeTrip: () => Promise<void>
}

const TripContext = React.createContext<TripContext>({} as TripContext)

export function useTrip(): TripContext {
  const context = React.useContext(TripContext)

  if (!context) {
    throw Error("useTrip must be used within an TripProvider")
  }
  return context
}
export function TripProvider({ children, id }: { children: React.ReactNode; id: string }) {
  // TODO: remove this and read in the trip in the initilizeTrip() function

  const [trip, setTrip] = React.useState<TripUseState>({
    uid: "",
    attendees: new Set(),
    duration: {
      start: new Date(),
      end: new Date(),
    },
    destination: "",
    suggestions: new Map<string, SuggestionWidget>(),
    itinerary: [],
    joinableEvents: [],
    photoURL: "",
  })

  async function initilizeTrip() {
    let trip = await getTrip()
    let eventData = await getEventData()

    if (trip === null || eventData == null) {
      alert("Cannot load trip.")
      return
    }

    console.log("initializing trip....")
    setTrip({
      ...trip,
      itinerary: eventData.userEvents,
      joinableEvents: eventData.joinableEvents,
    })
  }

  async function getTrip() {
    const options = createFetchRequestOptions(null, "GET")
    let t = null
    const response = await fetch(`${API_URL}trip/${id}`, options)
    if (response.ok) {
      t = (await response.json()) as Trip
    }
    return t
  }

  function addEventToList(list: Array<Array<Event>>, event: Event) {
    if (list.length === 0) {
      list.push([
        {
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        },
      ])
      return list
    }

    if (
      new Date(list[list.length - 1][0].duration.start).toLocaleDateString() !==
      new Date(event.duration.start).toLocaleDateString()
    ) {
      list.push([
        {
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        },
      ])
      return list
    }

    list[list.length - 1].push({
      ...event,
      duration: {
        start: new Date(event.duration.start),
        end: new Date(event.duration.end),
      },
    })
    return list
  }

  // TODO: Handle short break periods when determining joinable events
  async function getEventData() {
    let joinableEvents: Array<Array<Event>> = []
    let userEvents: Array<Array<Event>> = []

    const response = await fetch(`${API_URL}trip/${id}/event`, {
      method: "GET",
    })

    if (response.ok) {
      let data = await response.json()

      const { joinable, itinerary }: { joinable: Array<Event>; itinerary: Array<Event> } = data

      // Determine actualy joinable events
      let joinableIndex = 0

      itinerary.forEach((event: Event, index) => {
        if (joinableIndex < joinable.length) {
          if (
            event.duration.end <= joinable[joinableIndex].duration.start &&
            (index + 1 == itinerary.length ||
              itinerary[index + 1].duration.start >= joinable[joinableIndex].duration.end)
          ) {
            joinableEvents = addEventToList(joinableEvents, joinable[joinableIndex])
            joinableIndex++
          } else if (index === 0 && joinable[joinableIndex].duration.end <= event.duration.start) {
            joinableEvents = addEventToList(joinableEvents, joinable[joinableIndex])
            joinableIndex++
          } else {
            joinableIndex++
          }
        }

        userEvents = addEventToList(userEvents, event)
      })

      while (joinableIndex < joinable.length) {
        joinableEvents = addEventToList(joinableEvents, joinable[joinableIndex])
        joinableIndex++
      }
    }

    if (response.ok) {
      return { userEvents, joinableEvents }
    }
    return null
  }

  React.useEffect(() => {
    console.log("getting data for trip:", id)
    initilizeTrip()
  }, [])

  return (
    <TripContext.Provider
      value={{
        initilizeTrip,
        trip,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}
