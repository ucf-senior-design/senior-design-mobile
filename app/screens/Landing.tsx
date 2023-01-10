import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Text, Button, Screen } from "../components"
import { AppStackScreenProps } from "../navigators/AppNavigator"
import { colors } from "../theme"
import ThirdPartyAuth from "../components/authentication/ThirdPartyAuth"
import { navigate } from "../navigators"

type LandingProps = AppStackScreenProps<"Landing">
export const LandingScreen: FC<LandingProps> = observer(function LandingScreen() {
  return (
    <Screen
      preset="fixed"
      backgroundImage={require("../../assets/images/plane.png")}
      statusBarStyle="light"
      backgroundColorWithImage={colors.background}
    >
      <View style={$welcomeContent}>
        <Text
          text="Welcome to your personal trip planner"
          preset="heading"
          style={{ textAlign: "left", marginBottom: 20 }}
        />
        <Button text="Create Account" preset="default" onPress={() => navigate("CreateAccount")} />
        <Button text="Login" preset="filled" onPress={() => navigate("Login")} />

        <ThirdPartyAuth />
      </View>
    </Screen>
  )
})

const $welcomeContent: ViewStyle = {
  flex: 1,
  alignItems: "center",
  margin: 20,
  justifyContent: "flex-end",
  flexDirection: "column",
}
