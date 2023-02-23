import { View } from "react-native"
import React from "react"
import { colors } from "../../theme"
import { Text } from "../Text"
import { Event } from "../../../types/trip"
import { Avatar, Modal } from "@ui-kitten/components"
import { Icon, Button } from "../"

export function getTime(date: Date) {
  // Need to check for minute rather than just put hour
  return date.toLocaleTimeString([], { hour: "2-digit" })
}

type EventInfoProps = {
  event: Event
}
export function EventInfo(props: EventInfoProps) {
  const { event } = props
  const [visible, setVisible] = React.useState(true)

  return (
    <Modal
      visible={visible}
      style={{ width: "90%", height: "80%", justifyContent: "center", borderRadius: 5 }}
    >
      <View style={{ backgroundColor: "white", borderRadius: 20, padding: 15 }}>
        <View>
          <Text
            text={event.title}
            preset="title"
            style={{ color: colors.palette.neutral1000 }}
            size="xxl"
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Icon icon={"vector"} />
              <Text
                text={event.location}
                preset="bold"
                size="sm"
                style={{ color: colors.palette.neutral1000, paddingLeft: 5 }}
              />
            </View>
            <Text
              text={`${getTime(event.duration.start)} - ${getTime(event.duration.end)}`}
              preset="bold"
              size="sm"
              style={{
                textAlign: "right",
                color: colors.palette.neutral1000,
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", padding: 10, flexWrap: "wrap" }}>
          {/* TODO: This will map the attendee profile pictures once they are implemented */}
          {event.attendees.map((attendee) => {
            return (
              <View key={Math.random()} style={{ paddingRight: 10 }}>
                <Avatar
                  source={{
                    uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
                  }}
                />
              </View>
            )
          })}
        </View>
        <View style={{}}>
          <Text
            text={event.description}
            preset="subheading"
            size="sm"
            style={{ color: "black", paddingBottom: 10, textAlign: "left", paddingLeft: 10 }}
          />
          <View style={{ alignItems: "center", justifyContent: "flex-end", paddingTop: 20 }}>
            <Button text="Modify" preset="reversed"></Button>
            <Button
              text="Leave"
              preset="filled"
              style={{ borderColor: colors.palette.inputText, borderWidth: 1 }}
              onPress={() => {
                setVisible(false)
              }}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}
