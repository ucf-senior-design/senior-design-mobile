import { Pressable, View, ViewStyle } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "./Icon"
import { navigate, navigationRef } from "../navigators"
import { Home } from "../screens/Dashboard/Home"
import { Account } from "../screens/Dashboard/Account"

export type TabStackParamList = {
  Account: undefined
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

const Tab = createBottomTabNavigator<TabStackParamList>()

const TabNavigator = () => {
  const $selected: ViewStyle = {
    borderTopWidth: 3,
    borderColor: "white",
  }
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
          if (route.name === "Home")
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
          else return <Icon icon="debug" />
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
  // return (
  //   <View style={{ backgroundColor: "black", height: 50, display: "flex", flexDirection: "row" }}>
  //     <Pressable
  //       onPress={() => {
  //         navigate("Home")
  //         console.log("home")
  //       }}
  //       style={[
  //         {
  //           flex: 1,
  //           alignItems: "center",
  //           justifyContent: "center",
  //         },
  //         navigationRef.current.getRootState().routes[0].name === "Home" && $selected,
  //       ]}
  //     >
  //       <Icon icon="briefcase"></Icon>
  //     </Pressable>
  //     <Pressable
  //     onPress={() => {
  //       navigate("Account")
  //       console.log("account")
  //     }}
  //       style={[
  //         { flex: 1, alignItems: "center", justifyContent: "center" },
  //         navigationRef.current.getRootState().routes[0].name === "Account" && $selected,
  //       ]}
  //     >
  //       <Icon icon="personSmall"></Icon>
  //     </Pressable>
  //   </View>
  // )
}

export default TabNavigator
