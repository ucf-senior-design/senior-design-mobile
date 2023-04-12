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

  async function maybeUpdatePicture() {
    const result = await launchImageLibrary({ includeBase64: true, mediaType: "photo" })
    if (result.assets.length > 0 && result.assets[0].base64) {
      sDetails((details) => ({
        ...details,
        profilePic: `data:image/png;base64,${result.assets[0].base64}`,
      }))
    }
  }

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
    <Screen goBackHeader={true} statusBarStyle="light">
      <View style={{ flex: 1 }}>
        <ScrollView style={$container} contentContainerStyle={$container} centerContent={true}>
          <Text
            text="Personal Information"
            style={{ paddingBottom: 10, alignSelf: "center" }}
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
            preset="default"
            style={{
              margin: 5,
              width: "100%",
              marginTop: spacing.small,
            }}
            text="Save Changes"
            RightAccessory={() => <Icon icon="caretRight" color="white" />}
            onPress={async () => {
              await updateUser(
                {
                  ...details,
                  medicalInfo: Array.from(medicalCond.values.selected),
                  allergies: Array.from(foodAllergies.values.selected),
                  uid: user.uid ?? "",
                },
                callbackFunc,
              )
            }}
          />
        </ScrollView>
      </View>
    </Screen>
  )
})
