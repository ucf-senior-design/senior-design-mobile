import { Button, TextField } from "../"
import { Datepicker } from "@ui-kitten/components"
import { Event } from "../../../types/trip"
import { TextInput } from "react-native"

export default function ModifyEvent({ isNew, event }: { isNew: boolean; event?: Event }) {
  return (
    <>
      <TextField label={"title"} />
      <TextField label={"location"} />
      <TextField label={"description"} />

      <Datepicker />
      <TextInput />
      <TextInput />

      <Button> Delete Event</Button>
      <Button> Save Changes </Button>
    </>
  )
}
