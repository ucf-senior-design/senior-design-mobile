import React from "react"
import { API_URL } from "@env"
import { Event, Trip } from "../../../types/trip"
import { createFetchRequestOptions } from "../../utils/fetch"

export type Day = {
  date: Date
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
  leaveEvent: (uid: string) => void
  joinEvent: (uid: string) => void
  closeShowEvent: () => void
  openShowEvent: (event: Event) => void
  selectedEvent: Event
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
  const [selectedEvent, setSelectedEvent] = React.useState<Event | undefined>()

  function closeShowEvent() {
    setSelectedEvent(undefined)
  }

  function openShowEvent(event: Event) {
    setSelectedEvent(event)
  }

  function getISODate(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + "-" + month + "-" + day
  }

  async function leaveEvent(uid: string) {
    await fetch(`${API_URL}trip/${trip.uid}/event/leave/${uid}`, { method: "PUT" }).then(
      async (response) => {
        if (response.ok) {
          const events = await getEventData()

          setTrip({
            ...trip,
            joinableEvents: events.joinableEvents,
            itinerary: events.userEvents,
          })
        } else {
          alert("Cannot leave event right now.")
        }
      },
    )
  }
  async function joinEvent(uid: string) {
    await fetch(`${API_URL}trip/${trip.uid}/event/join/${uid}`, { method: "PUT" }).then(
      async (response) => {
        if (response.ok) {
          const events = await getEventData()

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

  function getEventsByDay(
    start: Date,
    end: Date,
    itinerary: Array<Array<Event>>,
    joinableEvents: Array<Array<Event>>,
  ) {
    const dayMilli = 1000 * 3600 * 24
    const days: Array<Day> = []

    let iIndex = 0
    let jIndex = 0

    for (let day = start.getTime(); day <= end.getTime(); day += dayMilli) {
      days.push({
        date: new Date(day),
        itinerary: [],
        joinable: [],
      })
      if (iIndex < itinerary.length) {
        if (
          itinerary[iIndex][0].duration.start.getDay() === new Date(day).getDay() &&
          itinerary[iIndex][0].duration.start.getMonth() === new Date(day).getMonth()
        ) {
          days[days.length - 1].itinerary = itinerary[iIndex]
          iIndex += 1
        }
      }

      if (jIndex < joinableEvents.length) {
        if (
          joinableEvents[jIndex][0].duration.start.getDay() === new Date(day).getDay() &&
          joinableEvents[jIndex][0].duration.start.getMonth() === new Date(day).getMonth()
        ) {
          days[days.length - 1].joinable = joinableEvents[jIndex]
          jIndex += 1
        }
      }
    }

    return days
  }

  async function initilizeTrip() {
    const trip = await getTrip()
    if (trip === null) {
      alert("Cannot load trip.")
      return
    }
    const eventData = await getEventData()
    if (trip === null || eventData === null) {
      alert("Cannot load trip.")
      return
    }

    console.log("initializing trip....")
    setTrip({
      ...trip,
      itinerary: eventData.userEvents,
      joinableEvents: eventData.joinableEvents,
      days: getEventsByDay(
        trip.duration.start,
        trip.duration.end,
        eventData.userEvents,
        eventData.joinableEvents,
      ),
    })
  }

  async function getTrip() {
    const options = createFetchRequestOptions(null, "GET")
    console.log("GETTRIP",id)
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
      const data = await response.json()

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
    console.log("update")
    if (trip.uid.length !== 0)
      setTrip({
        ...trip,
        days: getEventsByDay(
          trip.duration.start,
          trip.duration.end,
          trip.itinerary,
          trip.joinableEvents,
        ),
      })
  }, [trip.joinableEvents, trip.itinerary])

  return (
    <TripContext.Provider
      value={{
        initilizeTrip,
        trip,
        joinEvent,
        closeShowEvent,
        openShowEvent,
        selectedEvent,
        leaveEvent,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}
