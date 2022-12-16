import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Text, Button, Screen } from "../components"
import { AppStackScreenProps } from "../navigators/AppNavigator"
import { colors, spacing } from "../theme"
import ThirdPartyAuth from "../components/authentication/ThirdPartyAuth"

const planeImage = require("../../assets/images/plane.png")
interface LandingProps extends AppStackScreenProps<"Landing"> {}
export const LandingScreen: FC<LandingProps> = observer(function LandingScreen() {
  return (
    <View style={$container}>
      <Image style={$landingPlane} source={planeImage} />
      <View style={$welcomeContent}>
        <Text
          text="welcome to your personal trip planner"
          preset="heading"
          style={{ textAlign: "left", marginBottom: 20 }}
        />
        <Button text="CREATE ACOUNT" preset="default" />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              marginRight: 10,
              borderBottomColor: colors.text,
              borderBottomWidth: 2,
            }}
          />
          <Text> or </Text>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              borderBottomColor: colors.text,
              borderBottomWidth: 2,
            }}
          />
        </View>
        <Button text="LOG IN" preset="filled" />
        <ThirdPartyAuth />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 2,
  flex: 1,
  backgroundColor: colors.background,
  flexDirection: "row",
  alignItems: "flex-end",
}

const $welcomeContent: ViewStyle = {
  flex: 1,
  alignItems: "center",
  margin: 20,
  flexDirection: "column",
}

const $landingPlane: ImageStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
}
