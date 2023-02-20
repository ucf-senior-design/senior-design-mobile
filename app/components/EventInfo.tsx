import { View, ViewStyle } from "react-native"
import React from "react"
import { Icon } from "./Icon"
import { colors } from "../theme"
import { Text } from "./Text"
import { Event } from "../../types/trip"
import { Avatar, Modal } from "@ui-kitten/components"
import { Button } from "./Button"

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
      style={{ width: "80%", height: "80%", justifyContent: "center", borderRadius: 5 }}
    >
      <View style={{ backgroundColor: "white", borderRadius: 20, padding: 15 }}>
        <View>
          <Text text={event.title} preset="title" style={{ color: colors.palette.neutral1000 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Icon icon="pin" />
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

          {/* <Icon icon="personSmall" style={{left:300}}/> */}
          {/* This will be the icons spot */}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
          <Avatar
            source={{
              uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
            }}
          />
          <Avatar
            source={{
              uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
            }}
          />
          <Avatar
            source={{
              uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
            }}
          />
          <Avatar
            source={{
              uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
            }}
          />
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
