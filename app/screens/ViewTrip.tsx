import { View, Text } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps, navigationRef } from "../navigators"

type ViewTripProps = AppStackScreenProps<"ViewTrip">
export const ViewTrip: FC<ViewTripProps> = observer(function ViewTripScreen() {
  // takes in any params

  return (
    <View style={{ flex: 1 }}>
      <Text>Trips</Text>
    </View>
  )
})
