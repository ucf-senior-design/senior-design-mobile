import React from "react"
import { useTrip } from "../../models/hooks/trip"
import { TripDay } from "./TripDay"

export function ItineraryDropdown() {
  const { trip } = useTrip()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {trip.days.map((day, index) => {
        return <TripDay day={day} index={index} />
      })}
    </>
  )
}
