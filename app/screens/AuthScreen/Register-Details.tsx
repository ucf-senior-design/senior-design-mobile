import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps, navigate } from "../../navigators"
import { Screen, TextField, SelectChipList, Button, Icon, Text } from "../../components"
import { Image } from "react-native"
import { Auth } from "../../models/hooks"
import { SelectListHook } from "../../models/hooks"
import { spacing } from "../../theme"
import { save, load } from "../../utils/storage"
type RegisterProps = AppStackScreenProps<"Details">
export const Details: FC<RegisterProps> = observer(function Details() {
  const [details, sDetails] = useState({
    profilePic: "",
    username: "",
    foodAllergies: [],
    medicalConditions: [],
  })

  async function getStoredUserInfo() {
    const user = await load("user")

    if (user === undefined || user === null) {
      return
    }
    sDetails((details) => ({
      ...details,
      profilePic: user.profilePic,
    }))
  }

  React.useEffect(() => {
    getStoredUserInfo()
  }, [])

  const foodAllergies = SelectListHook({
    options: ["egg", "peanuts", "tree nuts", "milk", "vegan"],
  })
  const medicalCond = SelectListHook({
    options: [
      "avoid crowds",
      "avoid unstable terrain",
      "avoid extended activity",
      "avoid flashing",
      "avoid loud noises",
    ],
  })
  const isUsernameInvalid = details.username.length === 0
  console.log(details)
  // TODO: Fix background image to svg so it will be nice on scrollable pages. Then make this screen preset="auto"
  return (
    <Screen
      preset="fixed"
      statusBarStyle="light"
      backgroundImage={require("../../../assets/images/gradientBg.png")}
      goBackHeader={true}
    >
      <View style={$container}>
        {details.profilePic.length > 0 && (
          <Image source={{ uri: details.profilePic }} style={{ width: 100, height: 100, alignSelf:"center", margin:spacing.small, borderRadius:spacing.medium }} />
        )}
        <Text
          text="let's add some details"
          preset="title"
          style={{ textAlign: "center", fontSize: 25 }}
        />
        <TextField
          status={isUsernameInvalid ? "error" : undefined}
          helper={isUsernameInvalid ? "invalid email" : undefined}
          label="username"
          onChangeText={(e) =>
            sDetails((details) => ({
              ...details,
              username: e,
            }))
          }
        />
        <SelectChipList hook={foodAllergies} label="allergies" propertyName="allergy" />
        <SelectChipList
          hook={medicalCond}
          label="medical conditions"
          propertyName="medical condition"
        />
        <Button
          preset="default"
          style={{
            alignSelf: "flex-end",
            marginTop: spacing.small,
          }}
          text="continue"
          RightAccessory={() => <Icon icon="caretRight" color="white" />}
          onPress={() => navigate("Email")}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  width: "100%",
  height: "100%",
  alignContent: "center",
  justifyContent: "center",
  flexDirection: "column",
}
