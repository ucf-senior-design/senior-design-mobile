import { ImageBackground, Pressable, View } from "react-native"
import React from "react"
import { Text } from "../Text"
import { getDate, locationToColor } from "../../utils/helper"
import { useTrip } from "../../models/hooks/trip"
import { Icon } from "../Icon"
import { goBack } from "../../navigators"
export function TripHeader() {
  const { trip } = useTrip()
  const $headerSize = { height: 250, width: "100%" }

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
          <View>
            <Pressable
              style={{
                paddingTop: 5,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
              onPress={() => goBack()}
            >
              <Icon icon="caretLeft" size={30} color="white" />
            </Pressable>
            <Text text={trip.destination} preset="heading" style={{ paddingTop: 5 }} size="xxl" />
            <Text
              text={getDate(trip.duration.start, false) + " - " + getDate(trip.duration.end, true)}
              preset="subheading"
              style={{ paddingTop: 5 }}
              size="sm"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}