import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../navigators"
import { SafeAreaView, ScrollView, View } from "react-native"
import { colors } from "../theme"
import { Trip, Duration } from "../../types/trip"
import { TripHeader } from "../components/Dashboard/TripHeader"
import { ItineraryDropdown } from "../components/Dashboard/ItineraryDropdown"

type TripItineraryProps = AppStackScreenProps<"TripItinerary">
export function getTime(date: Date) {
  return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

export function printDay(row: number, trip: Trip) {
  const day: Date = trip.duration.start
  day.setDate(day.getDate() + row)
  return getTime(day)
}

export function getDuration(duration: Duration) {
  // Need to check for minute rather than just put hour
  return (
    duration.start.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "") +
    " - " +
    duration.end.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "")
  )
}

export const TripItinerary: FC<TripItineraryProps> = observer(function TripItineraryScreen() {
  const trips = [
    {
      destination: "Orlando",
      uid: "uid",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image: "https://live.staticflickr.com/7171/6587698657_18a7326eb7_b.jpg",
    },
  ]

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%" }}>
      <TripHeader trip={trips[0]} />
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <ItineraryDropdown trip={trips[0]} />
        <ItineraryDropdown trip={trips[0]} />
      </ScrollView>
    </SafeAreaView>
  )
})
