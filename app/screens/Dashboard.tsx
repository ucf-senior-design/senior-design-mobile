import React, { FC } from "react"
import { Screen } from "../components"
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"

type DashboardProps = AppStackScreenProps<"Dashboard">
export const Dashboard: FC<DashboardProps> = observer(function DashboardScreen() {
  return <Screen preset="fixed" statusBarStyle="light" goBackHeader={true} showNavBar={true} />
})
