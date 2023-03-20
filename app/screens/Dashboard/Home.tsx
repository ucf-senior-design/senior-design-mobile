import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import TripCard from "../../components/Dashboard/TripCard"
import { DashboardProvider, useDashboard } from "../../models/hooks/dashboard"
import { Trip } from "../../../types/trip"
import { useAuth } from "../../models/hooks"

type HomeProps = AppStackScreenProps<"Home">
type TripList = {
  current: Array<Trip>
  upcoming: Array<Trip>
  previous: Array<Trip>
}
export const Home: FC<HomeProps> = observer(function HomeScreen() {
  const [tripList, setTripList] = React.useState<TripList>({
    current: [],
    upcoming: [],
    previous: [],
  })
  const { trips } = useDashboard()

  React.useEffect(() => {
    let current: Array<Trip> = []
    let upcoming: Array<Trip> = []
    let previous: Array<Trip> = []
    if (trips === undefined) {
      return
    }
    trips.forEach((trip) => {
      if (trip.duration.start <= new Date() && new Date() <= trip.duration.end) {
        current.push(trip)
      } else if (trip.duration.start >= new Date()) {
        upcoming.push(trip)
      } else {
        previous.push(trip)
      }
    })

    setTripList({
      current: current,
      upcoming: upcoming,
      previous: previous,
    })
  }, [trips])

  return (
    <Screen preset="scroll">
      <>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 40 }}>
          <Icon icon="briefcase" size={50}></Icon>
          <Text text=" Trips" preset="title" style={{ paddingTop: 5 }} size="xxl" />
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text text="current" preset="heading" size="xl" />
          <Text
            text={tripList.current.length + " trips"}
            size="xs"
            preset="default"
            style={{ paddingTop: 10 }}
          />
        </View>
        {tripList.current.map((trip) => {
          return (
            <>
              <TripCard key={trip.uid} size="lg" trip={trip} />
            </>
          )
        })}
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text text="upcoming" preset="heading" size="xl" />

          <Text
            text={tripList.upcoming.length + " trips"}
            size="xs"
            preset="default"
            style={{ paddingTop: 10 }}
          />
        </View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start" }}>
          {tripList.upcoming.map((trip) => {
            return (
              <>
                <TripCard key={trip.uid} size="sm" trip={trip} />
              </>
            )
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text text="previous" preset="heading" size="xl" />
          <Text
            text={tripList.previous.length + " trips"}
            size="xs"
            preset="default"
            style={{ paddingTop: 10 }}
          />
        </View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
          {tripList.previous.map((trip) => {
            return (
              <>
                <TripCard key={trip.uid} size="sm" trip={trip} />
              </>
            )
          })}
        </View>
      </>
    </Screen>
  )
})
