import { View, ViewStyle } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TripHome, Account, TripItinerary } from "../screens"
import { Icon } from "./Icon"

export type TabStackParamList = {
  TripHome: undefined
  Trips: undefined
  TripItinerary: undefined
  Account: undefined
}

const $focusedBar: ViewStyle = {
  borderTopWidth: 5,
  borderColor: "white",
  width: "100%",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const Tab = createBottomTabNavigator<TabStackParamList>()
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          border: "none",
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === "TripHome")
            return (
              <>
                <View style={focused ? $focusedBar : {}}>
                  <Icon icon="home"></Icon>
                </View>
              </>
            )
          else if (route.name === "Account")
            return (
              <>
                <View style={focused ? $focusedBar : {}}>
                  <Icon icon="personSmall"></Icon>
                </View>
              </>
            )
          else if (route.name === "Trips")
            return (
              <>
                <View style={focused ? $focusedBar : {}}>
                  <Icon icon="briefcase"></Icon>
                </View>
              </>
            )
          else return <Icon icon="debug" />
        },
      })}
    >
      <Tab.Screen name="TripHome" component={TripHome} />
      <Tab.Screen name="Trips" component={TripItinerary} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default TabNavigator
