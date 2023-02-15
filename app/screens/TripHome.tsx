import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { ScrollView, View } from "react-native"
import TripCard from "../components/TripCard"

type TripHomeProps = AppStackScreenProps<"TripHome">
export const TripHome: FC<TripHomeProps> = observer(function TripHomeScreen() {
  const trips = [
    {
      destination: "Orlando",
      uid: "uid",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image: "https://i.imgur.com/cbenG4l.png",
    },
    {
      destination: "Miami",
      uid: "uid2",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image: "https://i.imgur.com/cbenG4l.png",
    },
  ]
  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Icon icon="briefcase" size={50}></Icon>
        <Text text=" Trips" preset="title" style={{ paddingTop: 4 }} />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            height: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {/* TODO: Implement function to get current trip, if any */}
          <Text text="current" preset="heading" style={{ paddingBottom: 10 }} />
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
            <Text text="upcoming" preset="heading" />
            {/* TODO: Once API is in, change the trips.length */}
            <Text
              text={trips.length + " trips"}
              size="xs"
              preset="default"
              style={{ paddingTop: 10 }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {trips.map((trip) => {
              return (
                <TripCard
                  key={trip.uid}
                  size="sm"
                  trip={trip}
                />
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
            <Text text="previous" preset="heading" />
            <Text
              text={trips.length + " trips"}
              size="xs"
              preset="default"
              style={{ paddingTop: 10 }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {trips.map((trip) => {
              return (
                <TripCard
                  key={trip.uid}
                  size="sm"
                  trip={trip}
                />
              )
            })}
          </View>
        </ScrollView>
      </View>
    </Screen>
  )
})
