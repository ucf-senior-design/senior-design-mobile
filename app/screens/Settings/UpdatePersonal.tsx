import { ScrollView, View, ViewStyle } from "react-native"
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, SelectChipList, Text, TextField } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { Avatar } from "@ui-kitten/components"
import { spacing } from "../../theme"
import { launchImageLibrary } from "react-native-image-picker"
import { SelectListHook, useAuth } from "../../models/hooks"
import { load } from "../../utils/storage"
import updateUser from "../../models/hooks/settings"

interface UpdateUser {
  name: string
  medicalInfo: string[]
  allergies: string[]
}

type UpdatePersonalProps = AppStackScreenProps<"UpdatePersonal">
export const UpdatePersonal: FC<UpdatePersonalProps> = observer(function UpdatePersonalScreen() {
  const { user } = useAuth()
  console.warn("USER", user)
  const [details, sDetails] = useState<UpdateUser>({
    name: "",
    medicalInfo: [],
    allergies: [],
  })

  async function getStoredUserInfo() {
    if (user === undefined || user === null) {
      return
    }
    sDetails((details) => ({
      ...details,
      name: user.name ?? "",
      medicalInfo: user.medicalInfo ?? [],
      allergies: user.allergies ?? [],
    }))
  }

  React.useEffect(() => {
    getStoredUserInfo()
  }, [user])

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
  const isNameInvalid = details.name.length === 0

  const $container: ViewStyle = {
    width: "100%",
    paddingRight: 10,
    alignContent: "center",
    flexGrow: 1,
    flexDirection: "column",
  }

  const callbackFunc = (response) => {
    alert(response.isSuccess)
  }

  return (
    <Screen
      preset="fixed"
      goBackHeader={true}
      statusBarStyle="light"
      backgroundImage={require("../../../assets/images/gradientBg.png")}
    >
      <View style={{ flex: 1 }}>
        <ScrollView style={$container} contentContainerStyle={$container} centerContent={true}>
          <Text
            text="Settings"
            style={{ paddingBottom: 10, alignSelf: "center" }}
            preset="heading"
          />
          <Text
            text="Personal Information"
            style={{ paddingBottom: 10, alignSelf: "center", fontSize: 20 }}
            preset="heading"
          />
          <TextField
            status={isNameInvalid ? "error" : undefined}
            helper={isNameInvalid ? "missing name" : undefined}
            value={details.name}
            label="Name"
            onChangeText={(e) =>
              sDetails((details) => ({
                ...details,
                name: e,
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
            disabled={isNameInvalid}
            preset="filled"
            textStyle={{ color: "#111D40" }}
            style={{
              margin: 5,
              width: "100%",

              marginTop: spacing.small,
            }}
            text="Logout"
            onPress={async () => {
              await updateUser(
                {
                  ...details,
                  medicalInfo: Array.from(medicalCond.values.selected),
                  allergies: Array.from(foodAllergies.values.selected),
                  uid: user.uid ?? "",
                },
                (response) => {
                  console.warn(response)
                },
              )
            }}
          />

          <Button
            disabled={isNameInvalid}
            preset="default"
            style={{
              margin: 5,
              width: "100%",
              marginTop: spacing.small,
            }}
            text="Save Changes"
            onPress={async () => {
              await updateUser(
                {
                  ...details,
                  medicalInfo: Array.from(medicalCond.values.selected),
                  allergies: Array.from(foodAllergies.values.selected),
                  uid: user.uid ?? "",
                },
                (response) => {
                  if (!response.isSuccess) console.warn(response.errorMessage)
                },
              )
            }}
          />
        </ScrollView>
      </View>
    </Screen>
  )
})
