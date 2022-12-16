import { View, ViewStyle } from "react-native"
import { Icon } from ".."
import { spacing } from "../../theme"
import { doGoogleRegister, doFacebookRegister, doTwitterRegister } from "../../models/hooks/auth"
import React from "react"

export default function ThirdPartyAuth() {
  return (
    <View style={$container}>
      <Icon icon="google" onPress={() => doGoogleRegister()} style={$iconStyle} />
      <Icon icon="facebook" style={$iconStyle} onPress={() => doFacebookRegister()} />
      <Icon icon="twitter" style={$iconStyle} onPress={() => doTwitterRegister()} />
    </View>
  )
}

const $iconStyle = { height: 40, width: 40, margin: spacing.medium }

const $container: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: spacing.medium,
}
