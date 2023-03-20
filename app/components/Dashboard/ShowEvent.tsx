import { View } from "react-native"
import React from "react"
import { colors } from "../../theme"
import { Text } from "../Text"
import { Avatar } from "@ui-kitten/components"
import { BackdropModal } from "../BackdropModal"
import { Icon, Button } from ".."
import { getTime } from "../../utils/helper"
import { useTrip } from "../../models/hooks/trip"

export function ShowEvent() {
  const { closeShowEvent, selectedEvent, leaveEvent } = useTrip()

  if (selectedEvent === undefined) {
    return <></>
  }

  return (
    <BackdropModal isVisible={selectedEvent !== undefined} toggleShow={() => closeShowEvent()}>
      <View style={{ backgroundColor: "white" }}>
        <Text
          text={selectedEvent.title}
          preset="title"
          style={{ color: colors.palette.neutral1000, marginVertical: 5 }}
          size="xl"
        />
        <Text
          text={`${getTime(selectedEvent.duration.start)} - ${getTime(selectedEvent.duration.end)}`}
          preset="bold"
          size="sm"
          style={{
            color: colors.palette.neutral1000,
            marginBottom: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Icon icon={"vector"} style={{ marginRight: 10 }} />
          <Text
            text={selectedEvent.location}
            preset="bold"
            size="sm"
            style={{ color: colors.palette.neutral1000, paddingLeft: 5 }}
          />
        </View>

        <View style={{ flexDirection: "row", marginVertical: 15, flexWrap: "wrap" }}>
          {/* TODO: This will map the attendee profile pictures once they are implemented, the key will be the user's uid */}
          {selectedEvent.attendees.map((attendee) => {
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
            text={selectedEvent.description}
            preset="subheading"
            size="sm"
            style={{ color: "black", paddingBottom: 10, textAlign: "left" }}
          />
          <View style={{ alignItems: "center", justifyContent: "flex-end", paddingTop: 20 }}>
            <Button text="Modify" preset="reversed"></Button>
            <Button
              text="Leave"
              preset="filled"
              style={{ borderColor: colors.palette.inputText, borderWidth: 1 }}
              onPress={() => {
                leaveEvent(selectedEvent.uid)
                closeShowEvent()
              }}
            ></Button>
          </View>
        </View>
      </View>
    </BackdropModal>
  )
}
