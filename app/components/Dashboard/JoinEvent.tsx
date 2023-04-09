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
          width: "90%",
          alignSelf: "center",
          height: 60,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon icon={"add"} style={{ paddingLeft: 50 }} size={25} />
        <Text text={event.title} preset="bold" style={{ alignContent: "center" }} />
        <Text
          text={getDuration(event.duration)}
          preset="formHelper"
          style={{ paddingRight: 10 }}
          size="xxs"
        />
      </View>
    </TouchableOpacity>
  )
}