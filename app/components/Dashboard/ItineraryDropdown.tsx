import { View } from "react-native"
import React from "react"
import { Text } from "../Text"
import { Event } from "../../../types/trip"
import { Icon } from ".."
import CollapsibleList from "react-native-collapsible-list"
import { TimelineInfo } from "./TimelineInfo"
import { JoinEvent } from "./JoinEvent"

export function getDate(date: Date, year: boolean) {
  if (year) return date.toLocaleDateString([], { year: "numeric", month: "long", day: "2-digit" })
  else return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

type ItineraryDropdownProps = {
  itinerary: Array<Array<Event>>
  joinableEvents?: Array<Array<Event>>
}
export function ItineraryDropdown(props: ItineraryDropdownProps) {
  const { itinerary, joinableEvents } = props

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
      {itinerary.map((itinerary) => {
        return <TimelineInfo key={Math.random()} event={itinerary} />
      })}
      {joinableEvents ? (
        joinableEvents.map((day) => {
          return day.map((event) => {
            return <JoinEvent event={event} key={Math.random()} />
          })
        })
      ) : (
        <></>
      )}
    </CollapsibleList>
  )
}
