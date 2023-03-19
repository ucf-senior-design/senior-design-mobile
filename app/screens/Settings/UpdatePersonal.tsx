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
import { User } from "@react-native-google-signin/google-signin"

interface UpdateUser extends User {
  uid: string
  email: string
  name: string
  profilePic: string
  medicalInfo: string[]
  allergies: string[]
  username: string
}

type UpdatePersonalProps = AppStackScreenProps<"UpdatePersonal">
export const UpdatePersonal: FC<UpdatePersonalProps> = observer(function UpdatePersonalScreen() {
  const { user } = useAuth();
  const [details, sDetails] = useState<UpdateUser>({
    user: {
      id: "string",
      name: "string",
      email: "string",
      photo: "string",
      familyName: "string",
      givenName: "string",
    },
    idToken: "",
    serverAuthCode: "",
    uid: "",
    email: "",
    name: "",
    profilePic: "",
    medicalInfo: [],
    allergies: [],
    username: "",
  })

  async function getStoredUserInfo() {
    const user = await load("user")

    if (user === undefined || user === null) {
      return
    }
    sDetails((details) => ({
      ...details,
      user,
      uid: user.uid,
      email: user.email,
      profilePic: user.profilePic,
      name: user.name,
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

  return (
    <Screen goBackHeader={true}>
      <View style={{ alignSelf: "center", alignItems: "center" }}>
        <Text text="Personal Information" style={{ paddingBottom: 10 }} />
        <Avatar
          style={{ borderRadius: 100, minWidth: "30%", minHeight: 100 }}
          source={{
            uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={$container} contentContainerStyle={$container} centerContent={true}>
          <Text text="Details" preset="title" style={{ textAlign: "center", fontSize: 25 }} />

          <Button
            text="Change Profile Picture"
            preset="reversed"
            style={{ margin: 0 }}
            onPress={async () => await maybeUpdatePicture()}
          />

          <TextField
            status={isNameInvalid ? "error" : undefined}
            helper={isNameInvalid ? "missing name" : undefined}
            value={details.name}
            label="First Name"
            onChangeText={(e) =>
              sDetails((details) => ({
                ...details,
                name: e,
              }))
            }
          />
          <TextField
            status={isNameInvalid ? "error" : undefined}
            helper={isNameInvalid ? "missing name" : undefined}
            value={details.name}
            label="Last Name"
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
            disabled={isNameInvalid || isUsernameInvalid}
            preset="default"
            style={{
              margin: 5,
              width: "100%",
              marginTop: spacing.small,
            }}
            text="continue"
            RightAccessory={() => <Icon icon="caretRight" color="white" />}
            onPress={async () => {
              alert("Confirm the changes")
            }}
          />
        </ScrollView>
      </View>
    </Screen>
  )
})
