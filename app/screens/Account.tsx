import { View } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useAuth } from "../models/hooks/authentication"
import { Avatar } from "@ui-kitten/components"

type AccountProps = AppStackScreenProps<"Account">
export const Account: FC<AccountProps> = observer(function ViewTripScreen() {
  const { doLogout } = useAuth()
  return (
    <Screen>
      <View style={{paddingHorizontal: 20 , flexDirection: "row"}}>
        <Avatar 
        style={{borderRadius: 100, minWidth: "30%", minHeight: 100}}
        source={{uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png"}} />
        <View style={{paddingLeft: 30}}>
          <Text text="Ima Knight" preset="bold" size="xl"/>
          <Text text="email@domain.com" preset="formLabel"/>
        </View>
      </View>
      <View>
        <Text text="Profile" preset="heading" size="xl"/>
      </View>
      <View>
        <Text text="Notifications" preset="heading" size="xl"/>
      </View>
        <Button text="logout" onPress={() => doLogout()} />
    </Screen>
  )
})
