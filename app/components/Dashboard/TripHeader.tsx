import { ImageBackground, View } from "react-native"
import React from "react"
import { Text } from "../Text"
import { Trip } from "../../../types/trip"

type TripHeaderProps = {
  trip: Trip
}

export function getTime(date: Date, year: boolean) {
  if (year) return date.toLocaleDateString([], { year: "numeric", month: "long", day: "2-digit" })
  else return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

export function TripHeader(props: TripHeaderProps) {
  const { trip } = props
  const image = trip.image ? { uri: trip.image } : require("../../../assets/images/gradientBg.png")
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
      <ImageBackground
        source={image}
        style={{ height: 200, width: "100%" }}
        imageStyle={{ flex: 1 }}
      >
        <View style={{ marginBottom: 30, marginTop: "auto", paddingLeft: 20 }}>
          <Text text={trip.destination} preset="heading" style={{ paddingTop: 5 }} size="xxl" />
          <Text
            text={getTime(trip.duration.start, false) + " - " + getTime(trip.duration.end, true)}
            preset="subheading"
            style={{ paddingTop: 5 }}
            size="sm"
          />
        </View>
      </ImageBackground>
    </View>
  )
}