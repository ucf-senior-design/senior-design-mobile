import { View, ImageBackground, ViewStyle, StyleProp } from "react-native"
import React from "react"
import { Card } from "./Card"
import { Icon } from "./Icon"
import { colors, typography } from "../theme"
import Divider from "./Divider"
import { Text } from "./Text"
import { Trip } from "../../types/auth"

const background = {
  back: require("../../assets/images/gradientBg.png"),
}
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
  }
  const $style = [$defaultStyles, size === "sm" && $stylesToCenter]
  return (
    <View
      style={{
        borderRadius: 5,
        width: size === "lg" ? "100%" : "50%",
        height: size === "lg" ? 250 : 150,
      }}
    >
      <ImageBackground source={background.back} resizeMode="cover" style={$image}>
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

          {/* <Icon icon="personSmall" style={{left:300}}/> */}
          {/* This will be the icons spot */}
        </View>
      </ImageBackground>
    </View>
  )
}

export default TripCard
