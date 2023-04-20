import { View } from "react-native"
import React from "react"
import { colors } from "../../theme"
import { Text } from "../Text"
import { Event } from "../../../types/trip"
import { Icon } from "../"
import { TouchableOpacity } from "react-native-gesture-handler"
import { getDuration } from "../../utils/helper"
import { useTrip } from "../../models/hooks/trip"

type JoinEventProps = {
  event: Event
}

export function JoinEvent(props: JoinEventProps) {
  const { event } = props
  const { joinEvent } = useTrip()

  return (
    <TouchableOpacity onPress={() => joinEvent(event.uid)}>
      <View
        style={{
          backgroundColor: colors.palette.neutral800,
          width: "80%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          padding: 20,
          marginHorizontal: 20,
          alignSelf: "center",
          height: 60,
          marginTop: 20,

          flexWrap: "wrap",
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <Icon icon={"add"} style={{ marginHorizontal: 10 }} size={25} />
        <Text
          text={event.title}
          preset="bold"
          style={{ alignContent: "center", marginHorizontal: 10 }}
        />
        <Text
          text={getDuration(event.duration)}
          preset="formHelper"
          style={{ paddingRight: 10, marginHorizontal: 10 }}
          size="xxs"
        />
      </View>
    </TouchableOpacity>
  )
}
