// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from "./app/app.tsx"
import React from "react"
import { AppRegistry, LogBox } from "react-native"
import RNBootSplash from "react-native-bootsplash"

LogBox.ignoreAllLogs(true)

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("tripPlanner", () => IgniteApp)
export default App
