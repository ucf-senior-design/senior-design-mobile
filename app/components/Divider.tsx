import React from "react"
import { View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { Text } from "."

export default function Divider({ text }: { text: string }) {
  return (
    <View style={$baseView}>
      <View style={$rightLine} />
      <Text> {text} </Text>
      <View style={$leftLine} />
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
const $rightLine = [
  $baseDivider,
  {
    marginRight: 10,
  },
]

const $leftLine = [
  $baseDivider,
  {
    marginLeft: 10,
  },
]
