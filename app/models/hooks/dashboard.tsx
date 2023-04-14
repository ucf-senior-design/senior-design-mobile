import React from "react"
import { API_URL } from "@env"
import { Trip } from "../../../types/trip"
import { useAuth } from "./authentication"

interface DashboardContext {
  trips: Map<string, Trip> | undefined
}

const DashboardContext = React.createContext<DashboardContext>({} as DashboardContext)

export function useDashboard(): DashboardContext {
  const context = React.useContext(DashboardContext)

  if (!context) {
    throw Error("useDashboard  must be used within an DashboardProvider")
  }
  return context
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = React.useState<Map<string, Trip>>()
  const { user } = useAuth()

  console.log("tripstrips", trips)
  React.useEffect(() => {
    console.log("getting user trips....", user)
    if (user !== undefined && user.uid !== undefined) getTrips()
  }, [user])

  return (
    <DashboardContext.Provider
      value={{
        trips,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )

  async function getTrips() {
    const tTrips = new Map<string, Trip>()

    await fetch(`${API_URL}trip/none/${user?.uid ?? "uid"}/trip`, { method: "GET" })
      .then(async (response) => {
        if (response.ok) {
          await response.json().then((uTrips) => {
            uTrips.forEach((trip: Trip) => {
              trip.duration.start = new Date(trip.duration.start)
              trip.duration.end = new Date(trip.duration.end)
              trip.attendees = new Set(trip.attendees)
              tTrips.set(trip.uid, trip)
            })
          })

          setTrips(tTrips)
        } else {
          alert(await response.text())
        }
      })
      .catch((e) => {
        console.log("error", e)
      })
  }
}
