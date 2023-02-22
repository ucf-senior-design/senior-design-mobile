import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Icon, iconRegistry, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { ImageBackground, SafeAreaView, View } from "react-native"
import { colors } from "../theme"
import { ScrollView } from "react-native-gesture-handler"
import { Avatar, IndexPath, Select, SelectItem } from "@ui-kitten/components"
import { Trip } from "../../types/trip"
import Timeline from "react-native-timeline-flatlist"

type TripItineraryProps = AppStackScreenProps<"TripItinerary">
export function getTime(date: Date, year: boolean) {
  if (year) return date.toLocaleDateString([], { year: "numeric", month: "long", day: "2-digit" })
  else return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

export function printDay(row: number, trip: Trip) {
  const day: Date = trip.duration.start
  day.setDate(day.getDate() + row)
  return getTime(day, false)
}

export const TripItinerary: FC<TripItineraryProps> = observer(function TripItineraryScreen() {
  const trips = [
    {
      destination: "Orlando",
      uid: "uid",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8ErlMlPdnS5zbhJ2KL339H-cCsjrxjMl8A&usqp=CAU",
    },
  ]
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))

  const sample = [
    {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
  ]


  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%" }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <ImageBackground
          source={{ uri: "https://live.staticflickr.com/7171/6587698657_18a7326eb7_b.jpg" }}
          style={{ height: 200, width: "100%" }}
          imageStyle={{ flex: 1 }}
        >
          <View style={{ marginBottom: 30, marginTop: "auto", paddingLeft: 20 }}>
            <Text
              text={trips[0].destination}
              preset="heading"
              style={{ paddingTop: 5 }}
              size="xxl"
            />
            <Text
              text={
                getTime(trips[0].duration.start, true) +
                " - " +
                getTime(trips[0].duration.end, true)
              }
              preset="subheading"
              style={{ paddingTop: 5 }}
              size="sm"
            />
          </View>
        </ImageBackground>
      </View>
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
          <SelectItem title={"February 22"} />
          <SelectItem title={"February 23"} />
          <SelectItem title={"February 24"} />
        </Select>
        <View style={{ backgroundColor: "white", height: 2, width: "95%" }} />
      </View>
        <View style={{backgroundColor: "white", height: "100%"}}>
          {/* <Timeline data={sample} titleStyle={{ fontSize: 16, lineHeight: 24}} style={{padding: 10}}
          lineColor="red" circleSize={20}>
          </Timeline> */}
        </View>
    </SafeAreaView>
  )
})
