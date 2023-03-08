import React from "react"
import { View } from "react-native"
import { Avatar } from "@ui-kitten/components"
import { Event, Duration } from "../../../types/trip"
import Timeline from "react-native-timeline-flatlist"
import { Icon, Text } from "../../components"
import { Icon as UiKittenIcon } from "@ui-kitten/components"
import { EventInfo } from "../../components/Dashboard/EventInfo"
import { getDuration } from "../../utils/helper"



type TimelineInfoProps = {
  event: Array<Event>
}
export function TimelineInfo(props: TimelineInfoProps) {
  const { event } = props
  const renderDetail = (event) => {
    const title = (
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text text={event.title} preset="bold" size="md" />
        <Text text={getDuration(event.duration)} style={{ paddingRight: 10 }} size="xxs" />
      </View>
    )
    const desc = (
      <View>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon icon="personSmall" size={20} />
            <Text style={{ paddingLeft: 10 }} text={event.location} size="sm" />
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
    <Timeline
      data={event}
      circleSize={20}
      circleColor="white"
      lineColor="white"
      lineWidth={5}
      renderFullLine={true}
      showTime={false}
      style={{ paddingTop: 20 }}
      onEventPress={(item) => {
        return <EventInfo event={item[0]} />
      }}
      renderDetail={renderDetail}
    />
  )
}
