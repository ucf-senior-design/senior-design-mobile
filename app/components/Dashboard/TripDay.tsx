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
  const [open, setOpen] = React.useState(true)

  return (
    <>
      <View
        style={{
          alignSelf: "center",
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          borderColor: "white",
          borderBottomWidth: 0.5,
          marginVertical: 10,
        }}
      >
        <Text text={day.date ?? ""} preset="bold" size="md"></Text>
        {open ? (
          <Icon onPress={() => setOpen(!open)} size={18} icon="chevronDown" />
        ) : (
          <Icon onPress={() => setOpen(!open)} size={18} icon="chevronUp" />
        )}
      </View>
      {open && (
        <>
          {day.itinerary.length !== 0 || day.joinable.length !== 0 ? (
            <>
              <DayTimeline key={index} events={day.itinerary} />
              {day.joinable.map((event) => {
                return <JoinEvent event={event} key={event.uid} />
              })}
            </>
          ) : (
            <>
              <Text style={{ textAlign: "center" }}> no events planned yet!</Text>
            </>
          )}
        </>
      )}
    </>
  )
}
