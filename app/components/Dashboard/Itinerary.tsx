import React from "react"
import { View } from "react-native"
import { useTrip } from "../../models/hooks/trip"
import { colors } from "../../theme"
import { TripDay } from "./TripDay"

export function Itinerary() {
  const { trip } = useTrip()

  return (
    <View style={{ backgroundColor: colors.background }}>
      {trip.days.map((day, index) => {
        return <TripDay day={day} index={index} key={index} />
      })}
    </View>
  )
}
