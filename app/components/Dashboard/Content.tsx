import React from "react"
import { View } from "react-native"
import { Trip } from "../../../types/trip"
import { useDashboard } from "../../models/hooks/dashboard"
import TripCard from "./TripCard"
import { Icon, Screen, Text } from "../"
type TripList = {
  current: Array<Trip>
  upcoming: Array<Trip>
  previous: Array<Trip>
}
export default function Content() {
  const [tripList, setTripList] = React.useState<TripList>({
    current: [],
    upcoming: [],
    previous: [],
  })
  const { trips } = useDashboard()

  console.log("homehome", trips)
  React.useEffect(() => {
    const current: Array<Trip> = []
    const upcoming: Array<Trip> = []
    const previous: Array<Trip> = []
    if (trips === undefined) {
      return
    }
    trips.forEach((trip) => {
      if (trip.duration.start <= new Date() && new Date() <= trip.duration.end) {
        current.push(trip)
      } else if (trip.duration.start >= new Date()) {
        upcoming.push(trip)
      } else {
        previous.push(trip)
      }
    })

    setTripList({
      current,
      upcoming,
      previous,
    })
  }, [trips])
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 40 }}>
        <Icon icon="briefcase" size={50}></Icon>
        <Text text=" Trips" preset="title" style={{ paddingTop: 5 }} size="xxl" />
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent: "space-between",
        }}
      >
        <Text text="current" preset="heading" size="xl" />
        <Text
          text={tripList.current.length + " trips"}
          size="xs"
          preset="default"
          style={{ paddingTop: 10 }}
        />
      </View>
      {tripList.current.map((trip, index) => {
        return (
          <>
            <TripCard key={index} size="lg" trip={trip} />
          </>
        )
      })}
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent: "space-between",
        }}
      >
        <Text text="upcoming" preset="heading" size="xl" />

        <Text
          text={tripList.upcoming.length + " trips"}
          size="xs"
          preset="default"
          style={{ paddingTop: 10 }}
        />
      </View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start" }}>
        {tripList.upcoming.map((trip, index) => {
          return (
            <>
              <TripCard key={index} size="sm" trip={trip} />
            </>
          )
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent: "space-between",
        }}
      >
        <Text text="previous" preset="heading" size="xl" />
        <Text
          text={tripList.previous.length + " trips"}
          size="xs"
          preset="default"
          style={{ paddingTop: 10 }}
        />
      </View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
        {tripList.previous.map((trip, index) => {
          return (
            <>
              <TripCard key={index} size="sm" trip={trip} />
            </>
          )
        })}
      </View>
    </>
  )
}
