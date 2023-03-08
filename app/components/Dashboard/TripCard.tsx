import { View, ImageBackground, ViewStyle, StyleProp, Pressable } from "react-native"
import React from "react"
import { colors } from "../../theme"
import { Text } from "../Text"
import { Trip } from "../../../types/trip"
import { Avatar } from "@ui-kitten/components"
import { navigationRef } from "../../navigators"
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
    backgroundColor: trip.photoURL ? colors.transparent : "black",
    padding: 5,
  }
  function locationToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = "#"

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }
  const $style = [$defaultStyles, size === "sm" && $stylesToCenter]
  return (
    <Pressable
      onPress={() => navigationRef.navigate("ViewTrip", { uid: trip.uid })}
      style={{
        borderRadius: 5,
        width: size === "lg" ? "100%" : "50%",
        height: size === "lg" ? 270 : 120,
        padding: size === "lg" ? 30 : 6,
        paddingHorizontal: size === "lg" ? 0 : 8,
        paddingTop: size === "lg" ? 10 : 6,
      }}
    >
      <ImageBackground
        source={trip.photoURL !== undefined ? { uri: trip.photoURL } : undefined}
        resizeMode="cover"
        style={[$image]}
        imageStyle={{
          borderRadius: 15,
        }}
      >
        <View
          style={[
            $style,
            trip.photoURL === undefined && {
              backgroundColor: locationToColor(trip.destination),
              borderRadius: 15,
            },
            trip.photoURL !== undefined && { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
          ]}
        >
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
            {trip.photoURL ? <Avatar source={{ uri: trip.photoURL }} /> : <></>}
          </View>
        ) : (
          <></>
        )}
      </ImageBackground>
    </Pressable>
  )
}

export default TripCard
