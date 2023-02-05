import { View, Text } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TripHome, ViewTrip, Account } from "../screens"
import { colors } from "../theme"
import { roundToNearestMinutes } from "date-fns"
import { Icon } from "./Icon"

export type TabStackParamList = {
  TripHome: undefined
  Trips: undefined
  Account: undefined
}

const Tab = createBottomTabNavigator<TabStackParamList>()
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: "white",
          backgroundColor: colors.background,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "TripHome") return <Icon icon="home" />
          else if (route.name === "Account") return <Icon icon="personSmall" />
          else if (route.name === "Trips") return <Icon icon="briefcase" />
          else return <Icon icon="debug" />
        },

      })}
    >
      <Tab.Screen name="TripHome" component={TripHome} />
      <Tab.Screen name="Trips" component={ViewTrip} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default TabNavigator
