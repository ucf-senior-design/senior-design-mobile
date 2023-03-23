import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps, navigationRef } from "../../navigators"
import { Screen } from "../../components"
import { TripHeader } from "../../components/Dashboard/TripHeader"
import { Itinerary } from "../../components/Dashboard/Itinerary"
import { TripProvider } from "../../models/hooks/trip"
import { SafeAreaView, ScrollView } from "react-native"
import { ShowEvent } from "../../components/Dashboard"

type ViewTripProps = AppStackScreenProps<"ViewTrip">
export const ViewTrip: FC<ViewTripProps> = observer(function ViewTripScreen() {
  const { uid } = navigationRef.getCurrentRoute().params as any

  return (
    <Screen style={{ paddingTop: 0, paddingHorizontal: 0 }} goBackHeader={true}>
      <TripProvider id={uid}>
        {/* <ShowEvent /> */}
        <TripHeader />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <Itinerary />
          </ScrollView>
        </SafeAreaView>
      </TripProvider>
    </Screen>
  )
})
