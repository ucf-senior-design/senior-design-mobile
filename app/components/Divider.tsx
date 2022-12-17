import React from "react"
import { View, ViewProps, ViewStyle } from "react-native"
import { colors } from "../theme"
import { Text } from "."

export default function Divider({ text }: { text: string }) {
  return (
    <View style={$baseView}>
      <View
        style={[
          $baseDivider,
          {
            marginRight: 10,
          },
        ]}
      />
      <Text> {text} </Text>
      <View
        style={[
          $baseDivider,
          {
            marginLeft: 10,
          },
        ]}
      />
    </View>
  )
}

const $baseView: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
}
const $baseDivider: ViewStyle = {
  flex: 1,
  borderBottomColor: colors.text,
  borderBottomWidth: 2,
}
