import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import TripCard from "../components/TripCard"

type TripHomeProps = AppStackScreenProps<"TripHome">
export const TripHome: FC<TripHomeProps> = observer(function TripHomeScreen() {
  const trips = [
    {
      destination: "Orlando",
      uid: "uid",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8ErlMlPdnS5zbhJ2KL339H-cCsjrxjMl8A&usqp=CAU",
    },
    {
      destination: "Miami",
      uid: "uid2",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image:
        "https://c4.wallpaperflare.com/wallpaper/28/440/22/skyline-cityscape-miami-florida-wallpaper-preview.jpg",
    },
    {
      destination: "St.Augustine",
      uid: "uid3",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image: "https://i.imgur.com/cbenG4l.png",
    },
  ]
  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Icon icon="briefcase" size={50}></Icon>
        <Text text=" Trips" preset="title" style={{ paddingTop: 5 }} size="xxl" />
      </View>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {/* TODO: Implement function to get current trip, if any */}
        <Text text="current" preset="heading" style={{ paddingBottom: 10 }} size="xl" />
        <TripCard
          size="lg"
          trip={{
            destination: "Orlando",
            uid: "uid",
            attendees: [],
            duration: { start: new Date(), end: new Date() },
            image: "https://i.imgur.com/cbenG4l.png",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text text="upcoming" preset="heading" size="xl" />
          {/* TODO: Once API is in, change the trips.length */}
          <Text
            text={trips.length + " trips"}
            size="xs"
            preset="default"
            style={{ paddingTop: 10 }}
          />
        </View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start" }}>
          {trips.map((trip) => {
            return <TripCard key={trip.uid} size="sm" trip={trip} />
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
            text={trips.length + " trips"}
            size="xs"
            preset="default"
            style={{ paddingTop: 10 }}
          />
        </View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
          {trips.map((trip) => {
            return <TripCard key={trip.uid} size="sm" trip={trip} />
          })}
        </View>
      </ScrollView>
    </Screen>
  )
})
