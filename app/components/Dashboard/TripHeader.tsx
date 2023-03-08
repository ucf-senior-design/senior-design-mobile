import { ImageBackground, View } from "react-native"
import React from "react"
import { Text } from "../Text"
import { getDate, locationToColor } from "../../utils/helper"
import { useTrip } from "../../models/hooks/trip"

export function TripHeader() {
  const { trip } = useTrip()
  const $headerSize = { height: 200, width: "100%" }

  if (trip.uid === undefined || trip.uid.length === 0) {
    return <></>
  }
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
      <ImageBackground
        source={trip.photoURL !== undefined ? { uri: trip.photoURL } : undefined}
        style={[
          $headerSize,
          trip.photoURL === undefined && {
            backgroundColor: locationToColor(trip.destination),
          },
        ]}
        imageStyle={{ flex: 1 }}
      >
        <View
          style={[
            {
              height: 250,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingHorizontal: 15,
            },

            trip.photoURL !== undefined && {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          ]}
        >
          <Text text={trip.destination} preset="heading" style={{ paddingTop: 5 }} size="xxl" />
          <Text
            text={getDate(trip.duration.start, false) + " - " + getDate(trip.duration.end, true)}
            preset="subheading"
            style={{ paddingTop: 5 }}
            size="sm"
          />
        </View>
      </ImageBackground>
    </View>
  )
}
