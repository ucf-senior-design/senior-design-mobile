import { View, Text } from 'react-native'
import React from 'react'
import TabNavigator from '../../components/TabNavigator'
import { Screen } from '../../components'

const Dashboard = () => {
  return (
    <Screen
        preset="fixed"
        statusBarStyle="light"
        backgroundImage={require("../../../assets/images/gradientBg.png")}
        goBackHeader={true}
        showNavBar={true}
      >
</Screen>
  )
}

export default Dashboard