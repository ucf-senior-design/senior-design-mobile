import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { AppStackScreenProps } from '../navigators'

type  AccountProps = AppStackScreenProps<"Account">
export const Account: FC<AccountProps> = observer(function ViewTripScreen(){
  return (
    <View>
      <Text>Account</Text>
    </View>
  )
})
