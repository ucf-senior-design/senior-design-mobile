import { SafeAreaView, View } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Text } from "../components"
import { AppStackScreenProps, navigate } from "../navigators"
import { useAuth } from "../models/hooks/authentication"
import { Avatar, Menu, MenuItem, Toggle } from "@ui-kitten/components"
import { colors } from "../theme"

type AccountProps = AppStackScreenProps<"Account">
export const Account: FC<AccountProps> = observer(function AccountScreen() {
  const { user, doLogout } = useAuth()
  const [eventToggle, setEventToggle] = React.useState(false)
  const [itineraryToggle, setItineraryToggle] = React.useState(false)
  const [upcomingToggle, setUpcomingToggle] = React.useState(false)
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%", paddingHorizontal:20, paddingVertical: 10 }}>
      <View style={{ paddingHorizontal: 20, flexDirection: "row" }}>
        <Avatar
          style={{ borderRadius: 100, minWidth: "30%", minHeight: 100 }}
          source={{
            uri: (user.profilePic) ? (user.profilePic):"https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
          }}
          />
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
      {/* <View style={{ paddingVertical: 10 }}>
        <Text text="Notifications" preset="heading" size="xl" style={{ paddingVertical: 10 }} />
        <Menu style={{ borderRadius: 20 }}>
          <MenuItem
            title="Event Change Notifications"
            accessoryRight={<Toggle checked={eventToggle} onChange={setEventToggle} />}
            style={{ paddingRight: 15, paddingTop: 15 }}
            />
          <View style={{ height: 1, backgroundColor: "white" }} />
          <MenuItem
            title="Itinerary Change Notifications"
            accessoryRight={<Toggle checked={itineraryToggle} onChange={setItineraryToggle} />}
            style={{ paddingRight: 15, paddingTop: 15 }}
            />
          <View style={{ height: 1, backgroundColor: "white" }} />
          <MenuItem
            title="Upcoming Event Notifications"
            accessoryRight={<Toggle checked={upcomingToggle} onChange={setUpcomingToggle} />}
            style={{ paddingRight: 15, paddingTop: 15 }}
            />
          <View style={{ height: 1, backgroundColor: "white" }} />
        </Menu>
      </View> */}
      <Button text="logout" onPress={() => doLogout()}/>
      </SafeAreaView>
  )
})
