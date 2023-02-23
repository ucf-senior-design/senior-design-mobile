import { View } from "react-native"
import React from "react"
import { colors } from "../../theme"
import { Text } from "../Text"
import { Event, Duration } from "../../../types/trip"
import { Icon } from "../"

export function getDuration(duration: Duration) {
  // Need to check for minute rather than just put hour
  return (
    duration.start.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "") +
    " - " +
    duration.end.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "")
  )
}

type JoinEventProps = {
  event: Event
}
export function JoinEvent(props: JoinEventProps) {
  const { event } = props

  return (
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
  )
}
