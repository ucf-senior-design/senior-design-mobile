import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Icon, Screen, Text } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import TripCard from "../../components/Dashboard/TripCard"
import { DashboardProvider, useDashboard } from "../../models/hooks/dashboard"
import { Trip } from "../../../types/trip"
import Content from "../../components/Dashboard/Content"

type HomeProps = AppStackScreenProps<"Home">

export const Home: FC<HomeProps> = observer(function HomeScreen() {
  return (
    <DashboardProvider>
      <Screen
        preset="fixed"
        showNavBar={true}
        contentContainerStyle={{ marginTop: 35 }}
        statusBarStyle="light"
        backgroundImage={require("../../../assets/images/gradientBg.png")}
      >
        <ScrollView>
          <Content />
        </ScrollView>
      </Screen>
    </DashboardProvider>
  )
})
