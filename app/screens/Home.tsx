import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { View } from "react-native"

type HomeProps = AppStackScreenProps<"Home">
export const Home: FC<HomeProps> = observer(function HomeScreen() {
  const [bToggle, setBToggle] = React.useState(false)
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
      </View>
    </Screen>
  )
})
