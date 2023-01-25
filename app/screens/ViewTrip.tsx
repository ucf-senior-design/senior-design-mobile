import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { AppStackScreenProps } from '../navigators'

type ViewTripProps = AppStackScreenProps<"ViewTrip">
export const ViewTrip: FC<ViewTripProps> = observer(function ViewTripScreen(){
  return (
    <View>
      <Text>Trips</Text>
    </View>
  )
})