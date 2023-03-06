import { View } from "react-native"
import React from "react"
import { Text } from "../Text"
import { Trip } from "../../../types/trip"
import { Icon } from ".."
import CollapsibleList from "react-native-collapsible-list"
import { TimelineInfo } from "./TimelineInfo"
import { JoinEvent } from "./JoinEvent"

export function getDate(date: Date, year: boolean) {
  if (year) return date.toLocaleDateString([], { year: "numeric", month: "long", day: "2-digit" })
  else return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

const sampleEvent = [
  {
    uid: "uid",
    title: "Titles",
    attendees: ["Array<string>", "Array<string>"],
    duration: { start: new Date(), end: new Date() },
    location: "Location",
    description: "Description",
  },
  {
    uid: "uid",
    title: "Titles2",
    attendees: ["Array<string>"],
    duration: { start: new Date(), end: new Date() },
    location: "Location",
    description: "Description",
  },
  {
    uid: "uid",
    title: "Titles3",
    attendees: ["Array<string>"],
    duration: { start: new Date(), end: new Date() },
    location: "Location",
    description: "Description",
  },
  {
    uid: "uid",
    title: "Titles4",
    attendees: ["Array<string>"],
    duration: { start: new Date(), end: new Date() },
    location: "Location",
    description: "Description",
  },
]

type ItineraryDropdownProps = {
  trip: Trip
}
export function ItineraryDropdown(props: ItineraryDropdownProps) {
  const { trip } = props

  const [open, setOpen] = React.useState(false)

  return (
    <CollapsibleList
      numberOfVisibleItems={1}
      buttonPosition="top"
      onToggle={setOpen}
      buttonContent={
        <View
          style={{
            alignSelf: "center",
            width: "95%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
          }}
        >
          <Text text="March 1st" preset="bold" size="xl" style={{ paddingLeft: 5 }}></Text>
          {open ? <Icon icon="chevronUp" /> : <Icon icon="chevronDown" />}
        </View>
      }
    >
      <View style={{ alignItems: "center" }}>
        <View style={{ backgroundColor: "white", height: 2, width: "95%" }} />
      </View>
      <TimelineInfo event={sampleEvent} />
      <JoinEvent event={sampleEvent[0]}></JoinEvent>
    </CollapsibleList>
  )
}
