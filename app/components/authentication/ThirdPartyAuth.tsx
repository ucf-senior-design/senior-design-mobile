import { View, ViewStyle } from "react-native"
import { Icon } from ".."
import { spacing } from "../../theme"
import { useAuth } from "../../models/hooks"
import React from "react"
import Divider from "../Divider"

export default function ThirdPartyAuth() {
  const { doGoogleLogin, doFacebookLogin } = useAuth()
  return (
    <>
      <Divider text={"or"} />
      <View style={$container}>
        <Icon icon="google" onPress={() => doGoogleLogin()} style={$iconStyle} />
        <Icon icon="facebook" style={$iconStyle} onPress={() => doFacebookLogin()} />
      </View>
    </>
  )
}

const $iconStyle = { height: 40, width: 40, marginHorizontal: spacing.medium }

const $container: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: spacing.medium,
}
