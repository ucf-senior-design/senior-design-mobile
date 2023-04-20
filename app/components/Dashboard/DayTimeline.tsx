import React from "react"
import { View } from "react-native"
import { Avatar } from "@ui-kitten/components"
import { Event } from "../../../types/trip"
import Timeline from "react-native-timeline-flatlist"
import { Button, Icon, Text } from ".."
import { getDuration } from "../../utils/helper"
import { useTrip } from "../../models/hooks/trip"
import { ShowEvent } from "./ShowEvent"

export function DayTimeline({ events }: { events: Array<Event> }) {
  const { openShowEvent } = useTrip()

  const renderDetail = (event) => {
    const title = (
      <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Text
          text={event.title}
          preset="bold"
          size="md"
          style={{ textAlign: "left", width: "100%" }}
        />
        <Text
          text={getDuration(event.duration)}
          style={{ textAlign: "left", width: "100%" }}
          size="xxs"
        />
      </View>
    )
    const desc = (
      <View>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text text={event.location} size="sm" />
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          {/* TODO: The key will be the user's uid */}
          {event.attendees.map((attendee) => {
            return (
              <View key={attendee} style={{ paddingRight: 10 }}>
                <Avatar
                  key={"avatar" + attendee}
                  size="small"
                  source={{
                    uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
                  }}
                />
              </View>
            )
          })}
        </View>
      </View>
    )

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    )
  }

  return (
    <>
      <ShowEvent />
      <Timeline
        data={events}
        circleSize={20}
        circleColor="white"
        lineColor="white"
        lineWidth={5}
        renderFullLine={true}
        showTime={false}
        style={{ paddingTop: 20 }}
        onEventPress={(item) => {
          console.info("item", item)
          const event = item as any as Event
          openShowEvent(event)
        }}
        renderDetail={renderDetail}
      />
    </>
  )
}
