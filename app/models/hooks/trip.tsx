import React from "react"
import { API_URL } from "@env"
import { Event, SuggestionWidget, Trip } from "../../../types/trip"
import { createFetchRequestOptions } from "../../utils/fetch"

export type Day = {
  date: string
  itinerary: Array<Event>
  joinable: Array<Event>
}
interface TripUseState extends Trip {
  joinableEvents: Array<Array<Event>>
  itinerary: Array<Array<Event>>
  days: Array<Day>
}

interface TripContext {
  trip: TripUseState
  initilizeTrip: () => Promise<void>
  joinEvent: (uid: string) => void
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
    itinerary: [],
    joinableEvents: [],
    photoURL: "",
    days: [],
  })

  function getISODate(date: Date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return year + "-" + month + "-" + day
  }

  async function joinEvent(uid: string) {
    await fetch(`${API_URL}trip/${trip.uid}/event/join/${uid}`, { method: "PUT" }).then(
      async (response) => {
        if (response.ok) {
          let events = await getEventData()
          setTrip({
            ...trip,
            joinableEvents: events.joinableEvents,
            itinerary: events.userEvents,
          })
        } else {
          alert("Cannot join event right now.")
        }
      },
    )
  }

  function getEventsByDay() {
    let dayMilli = 1000 * 3600 * 24
    let days: Array<Day> = []

    let iIndex = 0
    let jIndex = 0
    console.log(
      trip.duration.start,
      getISODate(trip.duration.start),
      new Date(getISODate(trip.duration.start)).getTime(),
      new Date(trip.duration.start.toLocaleDateString()).getTime(),
      new Date(trip.duration.end.toLocaleDateString()).getTime(),
    )
    for (
      let day = new Date(getISODate(trip.duration.start)).getTime();
      day <= new Date(getISODate(trip.duration.end)).getTime();
      day += dayMilli
    ) {
      console.log("day", new Date(day).toLocaleDateString())
      days.push({
        date: new Date(day).toLocaleDateString(),
        itinerary: [],
        joinable: [],
      })
      if (iIndex < trip.itinerary.length) {
        if (
          trip.itinerary[iIndex][0].duration.start.toLocaleDateString() ===
          new Date(day).toLocaleDateString()
        ) {
          days[days.length - 1].itinerary = trip.itinerary[iIndex]
          iIndex += 1
        }
      }

      if (jIndex < trip.joinableEvents.length) {
        console.log(
          trip.joinableEvents[jIndex][0].duration.start.toLocaleDateString(),
          new Date(day).toLocaleDateString(),
        )
        if (
          trip.joinableEvents[jIndex][0].duration.start.toLocaleDateString() ===
          new Date(day).toLocaleDateString()
        ) {
          days[days.length - 1].joinable = trip.joinableEvents[jIndex]
          jIndex += 1
        }
      }
    }

    return days
  }
  async function initilizeTrip() {
    let trip = await getTrip()
    if (trip === null) {
      alert("Cannot load trip.")
      return
    }
    let eventData = await getEventData()

    if (trip === null || eventData === null) {
      alert("Cannot load trip.")
      return
    }

    console.log("initializing trip....")
    setTrip({
      ...trip,
      itinerary: eventData.userEvents,
      joinableEvents: eventData.joinableEvents,
      days: getEventsByDay(),
    })
  }

  async function getTrip() {
    const options = createFetchRequestOptions(null, "GET")
    let t = null
    const response = await fetch(`${API_URL}trip/${id}`, options)
    if (response.ok) {
      t = (await response.json()) as Trip
    }
    return {
      ...t,
      duration: { start: new Date(t.duration.start), end: new Date(t.duration.end) },
    } as Trip
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
            (index + 1 === itinerary.length ||
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

  React.useEffect(() => {
    setTrip({
      ...trip,
      days: getEventsByDay(),
    })
  }, [trip.joinableEvents, trip.itinerary])

  return (
    <TripContext.Provider
      value={{
        initilizeTrip,
        trip,
        joinEvent,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}
