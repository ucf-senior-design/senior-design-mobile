import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text, useAutoImage } from "../components"
import { AppStackScreenProps } from "../navigators"
import { ScrollView, View } from "react-native"
import { useAuth } from "../models/hooks"
import TripCard from "../components/TripCard"

type TripHomeProps = AppStackScreenProps<"TripHome">
export const TripHome: FC<TripHomeProps> = observer(function TripHomeScreen() {
  const { doLogout } = useAuth()
  const background = {
    back: require("../../assets/images/gradientBg.png"),
  }
  const exTrips = [
    {
      destination: "Orlando",
      uid: "uid",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
    },
    {
      destination: "Miami",
      uid: "uid",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
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
          <Text text="current" preset="heading" style={{ paddingBottom: 10 }} />
          <TripCard
            size="lg"
            trip={{
              destination: "Orlando",
              uid: "uid",
              attendees: [],
              duration: { start: new Date(), end: new Date() },
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
            <Text text="x trips" size="xs" preset="default" />
          </View>
          <TripCard
            size="sm"
            trip={{
              destination: "Orlando",
              uid: "uid",
              attendees: [],
              duration: { start: new Date(), end: new Date() },
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
            <Text text="previous" preset="heading" />
            <Text text="x trips" size="xs" preset="default" />
          </View>
          <TripCard
            size="sm"
            trip={{
              destination: "Orlando",
              uid: "uid",
              attendees: [],
              duration: { start: new Date(), end: new Date() },
            }}
          />
        </ScrollView>
      </View>
    </Screen>
  )
})
