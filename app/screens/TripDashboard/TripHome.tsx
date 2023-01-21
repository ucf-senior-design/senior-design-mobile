import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text, useAutoImage } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { ScrollView, View } from "react-native"
import { useAuth } from "../../models/hooks"

type TripHomeProps = AppStackScreenProps<"TripHome">
export const TripHome: FC<TripHomeProps> = observer(function TripHomeScreen() {
  const { doLogout } = useAuth()
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text text="TripHome screen" />
        <Button text="logout" onPress={() => doLogout()} />
      </ScrollView>
    </Screen>
  )
})
