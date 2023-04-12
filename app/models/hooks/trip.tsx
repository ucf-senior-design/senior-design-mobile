import React from "react"
import { API_URL } from "@env"
import { Duration, Event, Trip } from "../../../types/trip"
import { createFetchRequestOptions } from "../../utils/fetch"
import { useAuth } from "./authentication"
import dayjs from "dayjs"

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
  const { user } = useAuth()
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
    const options = createFetchRequestOptions(
      JSON.stringify({
        uid: user.uid ?? "uid",
      }),
      "PUT",
    )
    await fetch(`${API_URL}trip/${trip.uid}/event/leave/${uid}`, options).then(async (response) => {
      if (response.ok) {
        const events = await getEventData(
          dayjs(trip.duration.end).diff(dayjs(trip.duration.start), "days"),
          trip.duration,
        )

        setTrip({
          ...trip,
          joinableEvents: events.joinableEvents,
          itinerary: events.userEvents,
        })
      } else {
        alert("Cannot leave event right now.")
      }
    })
  }
  async function joinEvent(uid: string) {
    const options = createFetchRequestOptions(
      JSON.stringify({
        uid: user.uid ?? "uid",
      }),
      "PUT",
    )
    await fetch(`${API_URL}trip/${trip.uid}/event/join/${uid}`, options).then(async (response) => {
      if (response.ok) {
        const events = await getEventData(
          dayjs(trip.duration.end).diff(dayjs(trip.duration.start), "days"),
          trip.duration,
        )

        setTrip({
          ...trip,
          joinableEvents: events.joinableEvents,
          itinerary: events.userEvents,
        })
      } else {
        alert("Cannot join event right now.")
      }
    })
  }

  function getEventsByDay(
    start: Date,
    end: Date,
    itinerary: Array<Array<Event>>,
    joinableEvents: Array<Array<Event>>,
  ) {
    let days: Array<Day> = []

    let day = dayjs(start)

    while (!dayjs(end).add(1, "day").isSame(day, "day")) {
      days.push({
        date: day.toDate(),
        itinerary: itinerary[days.length],
        joinable: joinableEvents[days.length],
      })

      day = day.add(1, "day")
    }

    return days
  }

  async function initilizeTrip() {
    const trip = await getTrip()
    if (trip === null) {
      alert("Cannot load trip.")
      return
    }
    const eventData = await getEventData(
      dayjs(trip.duration.end).diff(dayjs(trip.duration.start), "days"),
      trip.duration,
    )
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

  function addEventToList(list: Array<Array<Event>>, event: Event, duration: Duration) {
    let l = Array.from(list)
    let index = 0
    let current = dayjs(duration.start)
    let end = dayjs(duration.end)

    while (current <= end) {
      if (current.date() === dayjs(event.duration.start).date()) {
        let oldDay = l[index]
        oldDay.push({
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        })

        oldDay = oldDay.sort((a, b) => a.duration.start.getTime() - b.duration.start.getTime())
        l[index] = oldDay
        return l
      }
      index += 1
      current = current.add(1, "day")
    }

    return l
  }

  async function getEventData(days: number, duration: Duration) {
    let joinableEvents: Array<Array<Event>> = []
    let userEvents: Array<Array<Event>> = []

    for (let i = 0; i <= days; i++) {
      joinableEvents.push([])
      userEvents.push([])
    }

    const response = await fetch(`${API_URL}trip/${id}/${user?.uid ?? "uid"}/event`, {
      method: "GET",
    })

    if (response.ok) {
      let data = await response.json()

      const { joinable, itinerary }: { joinable: Array<Event>; itinerary: Array<Event> } = data
      if (
        joinable === undefined ||
        joinable === null ||
        itinerary === undefined ||
        itinerary === null
      ) {
        return null
      }

      itinerary.forEach((event: Event) => {
        userEvents = addEventToList(userEvents, event, duration)
      })

      joinable.forEach((event: Event) => {
        if (!event.attendees.includes(user?.uid ?? ""))
          joinableEvents = addEventToList(joinableEvents, event, duration)
      })
    }

    console.log(response.ok)
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
