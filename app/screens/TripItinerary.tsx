import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../navigators"
import { SafeAreaView, View } from "react-native"
import { colors } from "../theme"
import { IndexPath, Select, SelectItem } from "@ui-kitten/components"
import { Trip } from "../../types/trip"
import { JoinEvent } from "../components/Dashboard/JoinEvent"
import { TripHeader } from "../components/Dashboard/TripHeader"

type TripItineraryProps = AppStackScreenProps<"TripItinerary">
export function getTime(date: Date) {
  return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

export function printDay(row: number, trip: Trip) {
  const day: Date = trip.duration.start
  day.setDate(day.getDate() + row)
  return getTime(day)
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
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))

  const sampleEvent = {
    uid: "uid",
    title: "Title",
    attendees: ["Array<string>"],
    duration: { start: new Date(), end: new Date() },
    location: "Location",
    description: "Description",
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%" }}>
      <TripHeader trip={trips[0]} />
      <View style={{ alignItems: "center" }}>
        <Select
          placeholder="Date"
          style={{ width: "95%" }}
          value={printDay(selectedIndex.row, trips[0])}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(index)
          }}
        >
          <SelectItem title={"February 23"} />
          <SelectItem title={"February 24"} />
          <SelectItem title={"February 25"} />
        </Select>
        <View style={{ backgroundColor: "white", height: 2, width: "95%" }} />
      </View>
      <JoinEvent event={sampleEvent}></JoinEvent>
    </SafeAreaView>
  )
})
