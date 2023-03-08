import React from "react"
import { Day } from "../../models/hooks/trip"
import { View } from "react-native"
import { Text } from "../Text"
import { Event } from "../../../types/trip"
import { Icon } from ".."
import CollapsibleList from "react-native-collapsible-list"
import { TimelineInfo } from "./TimelineInfo"
import { JoinEvent } from "./JoinEvent"
import { useTrip } from "../../models/hooks/trip"

export function TripDay({ day, index }: { day: Day; index: number }) {
  const [open, setOpen] = React.useState(false)

  return (
    <View style={{ marginVertical: 5 }}>
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
            <Text text={day.date ?? ""} preset="bold" size="xl" style={{ paddingLeft: 5 }}></Text>
            {open ? <Icon icon="chevronDown" /> : <Icon icon="chevronUp" />}
          </View>
        }
      >
        <View style={{ alignItems: "center" }}>
          <View style={{ backgroundColor: "white", height: 2, width: "95%" }} />
        </View>
        <TimelineInfo key={index} event={day.itinerary} />
        {day.joinable.map((event) => {
          return <JoinEvent event={event} key={event.uid} />
        })}
      </CollapsibleList>
    </View>
  )
}
