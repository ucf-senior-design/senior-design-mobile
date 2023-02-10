import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text, useAutoImage } from "../components"
import { AppStackScreenProps } from "../navigators"
import { ScrollView, View } from "react-native"
import { useAuth } from "../models/hooks"
import TripCard from "../components/TripCard"

type TripHomeProps = AppStackScreenProps<"TripHome">
export const TripHome: FC<TripHomeProps> = observer(function TripHomeScreen() {
  const { doLogout } = useAuth()
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            height: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text text="TripHome screen" />
          <View>
            <TripCard
              size="lg"
              trip={{
                destination: "Orlando",
                uid: "uid",
                attendees: [],
                duration: { start: new Date(), end: new Date() },
              }}
            />
          </View>
          <View>
            <TripCard
              size="sm"
              trip={{
                destination: "Orlando",
                uid: "uid",
                attendees: [],
                duration: { start: new Date(), end: new Date() },
              }}
            />
          </View>
        </ScrollView>
      </View>
    </Screen>
  )
})
