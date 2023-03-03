import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import TripCard from "../components/Dashboard/TripCard"
import { DashboardProvider, useDashboard } from "../models/hooks/dashboard"
import { Trip } from "../../types/trip"

type TripHomeProps = AppStackScreenProps<"TripHome">
type TripList = {
  current: Array<Trip>
  upcoming: Array<Trip>
  previous: Array<Trip>
}
export const TripHome: FC<TripHomeProps> = observer(function TripHomeScreen() {
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
    <DashboardProvider>
      <Screen>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Icon icon="briefcase" size={50}></Icon>
          <Text text=" Trips" preset="title" style={{ paddingTop: 5 }} size="xxl" />
        </View>
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            height: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text text="current" preset="heading" style={{ paddingBottom: 10 }} size="xl" />
          {tripList.current.map((trip) => {
            return (
              <>
                <TripCard size="lg" trip={trip} />
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
            {tripList.current.map((trip) => {
              return (
                <>
                  <TripCard size="sm" trip={trip} />
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
                  <TripCard size="sm" trip={trip} />
                </>
              )
            })}
          </View>
        </ScrollView>
      </Screen>
    </DashboardProvider>
  )
})
