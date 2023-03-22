import React from "react"
import { View } from "react-native"
import { Avatar } from "@ui-kitten/components"
import { Event, Duration } from "../../../types/trip"
import Timeline from "react-native-timeline-flatlist"
import { Icon, Text } from "../../components"
import { EventInfo } from "../../components/Dashboard/EventInfo"

export function getTime(date: Date) {
  // Need to check for minute rather than just put hour
  return date.toLocaleTimeString([], { hour: "2-digit" })
}

export function getDuration(duration: Duration) {
  // Need to check for minute rather than just put hour
  return (
    duration.start.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "") +
    " - " +
    duration.end.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "")
  )
}

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
          <View style={{ flexDirection: "row" }}>
            <Icon icon="personSmall" size={20} />
            <Text
              text="deg"
              preset="formHelper"
              style={{ paddingRight: 10, paddingLeft: 5 }}
              size="xxs"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          {/* TODO: The key will be the user's uid */}
          {event.attendees.map((attendee) => {
            return (
              <View key={Math.random()} style={{ paddingRight: 10 }}>
                <Avatar
                  key={Math.random()}
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
<<<<<<< HEAD:app/components/Dashboard/TimelineInfo.tsx
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
=======
    <>
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
          const event = item as any as Event
          openShowEvent(event)
        }}
        renderDetail={renderDetail}
      />
    </>
>>>>>>> hooks:app/components/Dashboard/DayTimeline.tsx
  )
}
