import { View, ImageBackground, ViewStyle, StyleProp } from "react-native"
import React from "react"
import { colors } from "../theme"
import { Text } from "./Text"
import { Trip } from "../../types/trip"
import { Avatar } from "@ui-kitten/components"

const $image: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.transparent,
  borderRadius: 5,
}
export function getTime(date: Date) {
  return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

type TripCardProps = {
  size: "sm" | "lg"
  trip: Trip
}
const TripCard = (props: TripCardProps) => {
  const { size, trip } = props
  const $defaultStyles = { flex: 1, padding: 20 }
  const $stylesToCenter: StyleProp<ViewStyle> = {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: trip.image ? colors.transparent : "black",
  }
  const $style = [$defaultStyles, size === "sm" && $stylesToCenter]
  return (
    <View
      style={{
        borderRadius: 5,
        width: size === "lg" ? "100%" : "50%",
        height: size === "lg" ? 250 : 150,
        paddingTop: size === "lg" ? 30 : 0,
        paddingHorizontal: size === "lg" ? 0 : 5,
      }}
    >
      <ImageBackground source={{ uri: trip.image }} resizeMode="cover" style={$image}>
        <View style={$style}>
          <Text
            text={trip.destination}
            preset="title"
            size={size === "lg" ? undefined : "lg"}
            style={{
              textAlign: "right",
            }}
          />
          {size === "lg" ? (
            <Text
              text={`${getTime(trip.duration.start)} - ${getTime(trip.duration.end)}`}
              preset="subheading"
              size="sm"
              style={{
                textAlign: "right",
              }}
            />
          ) : (
            <Text text={`${getTime(trip.duration.start)}`} preset="subheading" size="sm" />
          )}
        </View>
        {size === "lg" ? (
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 20 }}>
            <Text text="5 Days away" style={{ padding: 15 }} size="xs" preset="default" />
            {trip.image ? <Avatar source={{ uri: trip.image }} /> : <></>}
          </View>
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  )
}

export default TripCard
