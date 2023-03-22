import { Pressable, View, ViewStyle } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "./Icon"
import { navigate, navigationRef } from "../navigators"

export type TabStackParamList = {
  ViewTrip: undefined
  Home: undefined
}

const $focusedBar: ViewStyle = {
  borderTopWidth: 5,
  borderColor: "white",
  width: "100%",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const TabNavigator = () => {
  const $selected: ViewStyle = {
    borderTopWidth: 3,
    borderColor: "white",
  }

  console.log()
  return (
    <View style={{ backgroundColor: "black", height: 50, display: "flex", flexDirection: "row" }}>
      <Pressable
        onPress={() => navigate("Home")}
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          navigationRef.current.getRootState().routes[0].name === "Home" && $selected,
        ]}
      >
        <Icon icon="briefcase"></Icon>
      </Pressable>
      <Pressable
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          navigationRef.current.getRootState().routes[0].name === "Account" && $selected,
        ]}
      >
        <Icon icon="personSmall"></Icon>
      </Pressable>
    </View>
  )
}

export default TabNavigator
