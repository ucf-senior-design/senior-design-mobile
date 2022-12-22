// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components"
SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return (
  <ApplicationProvider {..eva} theme={eva.dark}>
<App hideSplashScreen={SplashScreen.hideAsync} />
  </ApplicationProvider>)
  
}

registerRootComponent(IgniteApp)
export default IgniteApp
