import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps, navigate } from "../../navigators"
import { Screen, TextField, SelectChipList, Button, Icon, Text } from "../../components"
import { useAuth } from "../../models/hooks"
import { Image } from "react-native"
import { User } from "../../../types/auth"
import { SelectListHook } from "../../models/hooks"
import { colors, spacing } from "../../theme"
import { load } from "../../utils/storage"
import { launchImageLibrary } from "react-native-image-picker"
type RegisterProps = AppStackScreenProps<"Details">

interface RegisterUser extends User {
  username: string
}
export const Details: FC<RegisterProps> = observer(function Details() {
  const [details, sDetails] = useState<RegisterUser>({
    uid: "",
    email: "",
    name: "",
    profilePic: "",
    userName: "",
    medicalInfo: [],
    allergies: [],
    username: "",
  })
  const [errorMessage, sErrorMessage] = useState("")

  async function getStoredUserInfo() {
    const user = await load("user")

    if (user === undefined || user === null) {
      return
    }
    sDetails((details) => ({
      ...details,
      uid: user.uid,
      email: user.email,
      profilePic: user.profilePic,
      name: user.name,
    }))
  }

  const { addDetails } = useAuth()
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
  async function maybeFinishRegister() {
    
    const user: User = {
      ...details,
      medicalInfo: Array.from(medicalCond.values.selected),
      allergies: Array.from(foodAllergies.values.selected),
    }
    await addDetails(user, (response) => {
      
      if (!response.isSuccess) {
        alert(response.errorMessage)
      }
    })
  }
  return (
    <Screen
      style={{ paddingHorizontal: 15, marginBottom: 20 }}
      preset="fixed"
      statusBarStyle="light"
      backgroundImage={require("../../../assets/images/gradientBg.png")}
      goBackHeader={true}
    >
      <View style={{ flex: 1 }}>
        <ScrollView style={$container} contentContainerStyle={$container} centerContent={true}>
          <Text
            text="let's add some details"
            preset="title"
            style={{ textAlign: "center", fontSize: 25 }}
          />
          <Text
            preset="subheading"
            text={errorMessage}
            style={{ color: colors.errorText, alignSelf: "center" }}
          />
          {details.profilePic.length > 0 && (
            <Image
              source={{ uri: details.profilePic }}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                margin: spacing.small,
                borderRadius: spacing.medium,
              }}
            />
          )}
          {details.profilePic.length === 0 && (
            <Icon
              icon="person"
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                margin: spacing.small,
                borderRadius: spacing.medium,
              }}
            />
          )}
          <Button
            text="Upload Picture "
            preset="noFill"
            style={{ margin: 0 }}
            onPress={async () => await maybeUpdatePicture()}
          />

          <TextField
            status={isNameInvalid ? "error" : undefined}
            helper={isNameInvalid ? "missing name" : undefined}
            value={details.name}
            label="name"
            onChangeText={(e) =>
              sDetails((details) => ({
                ...details,
                name: e,
              }))
            }
          />
          <TextField
            status={isUsernameInvalid ? "error" : undefined}
            helper={isUsernameInvalid ? "invalid username" : undefined}
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
            
              await maybeFinishRegister()
            }}
          />
        </ScrollView>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  width: "100%",
  paddingRight: 10,
  alignContent: "center",
  flexGrow: 1,
  flexDirection: "column",
}
