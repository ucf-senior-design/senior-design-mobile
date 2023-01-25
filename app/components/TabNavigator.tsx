import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TripHome, ViewTrip, Account } from '../screens'


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
            <Tab.Screen name="Trips" component={ViewTrip}/>
            <Tab.Screen name="Account" component={Account}/>
    </Tab.Navigator>
  )
}

export default TabNavigator;