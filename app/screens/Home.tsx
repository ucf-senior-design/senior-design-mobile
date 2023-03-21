import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { View } from "react-native"
import { useAuth } from "../models/hooks"

type HomeProps = AppStackScreenProps<"Home">
export const Home: FC<HomeProps> = observer(function HomeScreen() {
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
        <Text text="home screen" />
        <Button text="logout" onPress={() => doLogout()} />
      </View>
    </Screen>
  )
})
