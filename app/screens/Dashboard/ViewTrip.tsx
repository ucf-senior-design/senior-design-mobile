import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps, navigationRef } from "../../navigators"
import { Screen } from "../../components"
import { TripHeader } from "../../components/Dashboard/TripHeader"
import { Itinerary } from "../../components/Dashboard/Itinerary"
import { TripProvider } from "../../models/hooks/trip"
import { SafeAreaView, ScrollView } from "react-native"
import { ShowEvent } from "../../components/Dashboard/ShowEvent"
import { Event } from "../../../types/trip"

type ViewTripProps = AppStackScreenProps<"ViewTrip">
export const ViewTrip: FC<ViewTripProps> = observer(function ViewTripScreen() {
  const { uid } = navigationRef.getCurrentRoute().params as any

  return (
    <TripProvider id={uid}>
      <Screen style={{ paddingTop: 0, paddingHorizontal: 0 }}>
        <ShowEvent />
        <TripHeader />
        <SafeAreaView>
          <ScrollView>
            <Itinerary />
          </ScrollView>
        </SafeAreaView>
      </Screen>
    </TripProvider>
  )
})
