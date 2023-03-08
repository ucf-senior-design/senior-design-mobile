import React from "react"
import { Day } from "../../models/hooks/trip"
import { View } from "react-native"
import { Text } from "../Text"
import { Event } from "../../../types/trip"
import { Icon } from ".."
import CollapsibleList from "react-native-collapsible-list"
import { JoinEvent, DayTimeline } from "./"
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
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
              borderColor: "white",
              borderBottomWidth: 0.5,
            }}
          >
            <Text text={day.date ?? ""} preset="bold" size="lg"></Text>
            {open ? <Icon size={18} icon="chevronDown" /> : <Icon size={18} icon="chevronUp" />}
          </View>
        }
      >
        <DayTimeline key={index} events={day.itinerary} />

        {day.joinable.map((event) => {
          return <JoinEvent event={event} key={event.uid} />
        })}
      </CollapsibleList>
    </View>
  )
}
