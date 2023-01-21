import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { TripHome } from '../screens'
import Trips from '../screens/TripDashboard/Trips'
import Account from '../screens/TripDashboard/Account'

export type TabStackParamList = 
{
    TripHome: undefined,
    Trips: undefined,
    Account: undefined,
}

const Tab = createBottomTabNavigator<TabStackParamList>();
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "green",
        tabBarShowLabel: true,
        headerShown: false,
    })} >
            <Tab.Screen name="TripHome" component={TripHome}/>
            <Tab.Screen name="Trips" component={Trips}/>
            <Tab.Screen name="Account" component={Account}/>
    </Tab.Navigator>
  )
}

export default TabNavigator;