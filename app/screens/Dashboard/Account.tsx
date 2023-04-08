import { SafeAreaView, View } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Text } from "../../components"
import { AppStackScreenProps, navigate } from "../../navigators"
import { useAuth } from "../../models/hooks/authentication"
import { Avatar, Menu, MenuItem, Toggle } from "@ui-kitten/components"
import { colors } from "../../theme"

type AccountProps = AppStackScreenProps<"Account">
export const Account: FC<AccountProps> = observer(function AccountScreen() {
  const { user, doLogout } = useAuth()
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%", paddingHorizontal:20, paddingVertical: 100 }}>
      <View style={{ paddingHorizontal: 20, flexDirection: "row" }}>
        <View style={{ paddingLeft: 30 }}>
          <Text text={user.name} preset="bold" size="xl" />
          <Text text={user.email} preset="formLabel" />
        </View>
      </View>
      <View>
        <Text text="Profile" preset="heading" size="xl" style={{ paddingVertical: 10 }} />
        <Menu style={{ backgroundColor: "white" }}>
          <MenuItem
            onPress={() => navigate("UpdatePersonal")}
            title="Update Personal Information"
            accessoryRight={<Icon icon="caretRight" />}
            />
          <View style={{ height: 1, backgroundColor: "white" }} />
          <MenuItem
            onPress={() => navigate("Password")}
            title="Change password"
            accessoryRight={<Icon icon="caretRight" />}
            />
          <View style={{ height: 1, backgroundColor: "white" }} />
        </Menu>
      </View>
      <Button text="logout" onPress={() => doLogout()}/>
      </SafeAreaView>
  )
})
