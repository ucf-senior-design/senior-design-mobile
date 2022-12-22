import { View, ViewStyle } from "react-native"
import { Icon } from ".."
import { spacing } from "../../theme"
import { Auth } from "../../hooks"
import React from "react"
import Divider from "../Divider"

export default function ThirdPartyAuth() {
  const auth = Auth()

  return (
    <>
      <Divider text={"or"} />
      <View style={$container}>
        <Icon icon="google" onPress={() => auth.doGoogleLogin()} style={$iconStyle} />
        <Icon icon="facebook" style={$iconStyle} onPress={() => auth.doFacebookLogin()} />
        <Icon icon="twitter" style={$iconStyle} onPress={() => auth.doTwitterLogin()} />
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
