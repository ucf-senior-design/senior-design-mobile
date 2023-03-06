import { View } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, iconRegistry, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useAuth } from "../models/hooks/authentication"
import { Avatar, Menu, MenuItem } from "@ui-kitten/components"

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
        <Text text="Profile" preset="heading" size="xl" style={{paddingVertical: 20}}/>
        <Menu style={{borderRadius: 20, backgroundColor: "white"}}>
          <MenuItem title="Update Personal Information" accessoryRight={<Icon icon="caretRight"/>}/>
          <View style={{height: 1, backgroundColor: "white"}}/>
          <MenuItem title="Update Emergency Information" accessoryRight={<Icon icon="caretRight"/>}/>
          <View style={{height: 1, backgroundColor: "white"}}/>
          <MenuItem title="Change email" accessoryRight={<Icon icon="caretRight"/>}/>
          <View style={{height: 1, backgroundColor: "white"}}/>
          <MenuItem title="Change password" accessoryRight={<Icon icon="caretRight"/>}/>
          <View style={{height: 1, backgroundColor: "white"}}/>
        </Menu>
      </View>
      <View style={{paddingVertical: 10}}>
        <Text text="Notifications" preset="heading" size="xl" style={{paddingVertical: 20}}/>
        <Menu style={{borderRadius: 20}}>
          <MenuItem title="Event Change Notifications" accessoryRight={<Icon icon="caretRight"/>}/>
          <View style={{height: 1, backgroundColor: "white"}}/>
          <MenuItem title="Itinerary Change Notifications" accessoryRight={<Icon icon="caretRight"/>}/>
          <View style={{height: 1, backgroundColor: "white"}}/>
          <MenuItem title="Upcoming Event Notifications" accessoryRight={<Icon icon="caretRight"/>}/>
          <View style={{height: 1, backgroundColor: "white"}}/>
        </Menu>
      </View>
        <Button text="logout" onPress={() => doLogout()} />
    </Screen>
  )
})
