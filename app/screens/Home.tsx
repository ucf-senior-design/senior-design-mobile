import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"

type HomeProps = AppStackScreenProps<"Home">
export const Home: FC<HomeProps> = observer(function HomeScreen() {
  return (
    <Screen>
      <Text text="screen" />
    </Screen>
  )
})
