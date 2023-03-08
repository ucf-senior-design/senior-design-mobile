import { View } from "react-native"
import React from "react"
import { Text } from "../Text"
import { Event } from "../../../types/trip"
import { Icon } from ".."
import CollapsibleList from "react-native-collapsible-list"
import { TimelineInfo } from "./TimelineInfo"
import { JoinEvent } from "./JoinEvent"
import { useTrip } from "../../models/hooks/trip"

export function getDate(date: Date, year: boolean) {
  if (year) return date.toLocaleDateString([], { year: "numeric", month: "long", day: "2-digit" })
  else return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

export function ItineraryDropdown() {
  const { trip } = useTrip()

  if (trip.uid.length === 0) {
    return <></>
  }

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
      {trip.itinerary.map((itinerary) => {
        return <TimelineInfo key={Math.random()} event={itinerary} />
      })}
      {trip.joinableEvents.map((day) => {
        return day.map((event) => {
          return <JoinEvent event={event} key={Math.random()} />
        })
      })}
    </CollapsibleList>
  )
}
