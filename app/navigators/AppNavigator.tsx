/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import { User } from "../../types/auth"
import Config from "../config"
import { useAuth } from "../models/hooks"
import {
  LandingScreen,
  Login,
  CreateAccount,
  Email,
  Home,
  Password,
  Details,
  Dashboard,
  ViewTrip,
  Account,
  UpdatePersonal,
} from "../screens/"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Login: undefined
  Landing: undefined
  Details: undefined
  CreateAccount: undefined
  Email: undefined
  Home: undefined
  Password: undefined
  ViewTrip: undefined
  Dashboard: undefined
  Account: undefined
  UpdatePersonal: undefined
  UpdateEmergency: undefined
  ChangeEmail: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack({
  user,
}: {
  user: User & { didFinishRegister: boolean }
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pages shown to users that did not finish registration */}
      {user !== undefined && user !== null && !user.didFinishRegister && (
        <>
          <Stack.Screen name="Details" component={Details} />
          </>
        )}
      {/* Pages that should only be shown to not logged in users */}
      {(user === undefined || user === null) && (
        <>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          </>
        )}
      {/* Pages shown to only logged in users */}
      {user && user.didFinishRegister && (
        <>
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ViewTrip" component={ViewTrip} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="UpdatePersonal" component={UpdatePersonal} />
        <Stack.Screen name="Details" component={Details} />
        </>
      )}
      {/* Pages that can be shown to anyone */}
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Password" component={Password} />
    </Stack.Navigator>
  )
})

type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>> & {
  isLoggedIn: boolean
}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  const { user } = useAuth()
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack user={user} />
    </NavigationContainer>
  )
})
