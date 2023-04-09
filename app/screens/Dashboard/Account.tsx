import { SafeAreaView, View } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Text } from "../../components"
import { AppStackScreenProps, navigate } from "../../navigators"
import { useAuth } from "../../models/hooks/authentication"
import { Menu, MenuItem } from "@ui-kitten/components"
import { colors } from "../../theme"

type AccountProps = AppStackScreenProps<"Account">
export const Account: FC<AccountProps> = observer(function AccountScreen() {
  const { user, doLogout } = useAuth()
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%", paddingHorizontal:"5%", paddingVertical: "20%" }}>
      <View style={{ alignItems: "center" }}>
          <Text text={"Hello, " + user.name} preset="bold" size="xl" />
          <Text text={user.email} preset="formLabel" size="xxs" />
      </View>
      <View style={{paddingVertical: "5%"}}>
        <Text text="Profile" preset="heading" size="xl" style={{ paddingVertical: "2%" }} />
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
