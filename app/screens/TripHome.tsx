import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text, useAutoImage } from "../components"
import { AppStackScreenProps } from "../navigators"
import { View } from "react-native"
import { useAuth } from "../models/hooks"

type TripHomeProps = AppStackScreenProps<"TripHome">
export const TripHome: FC<TripHomeProps> = observer(function TripHomeScreen() {
  const { doLogout } = useAuth()
  return (
    <Screen>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text text="TripHome screen" />
        <Button text="logout" onPress={() => doLogout()} />
      </View>
    </Screen>
  )
})
