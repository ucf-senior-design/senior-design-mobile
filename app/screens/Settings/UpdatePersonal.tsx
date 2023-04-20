import { ScrollView, View, ViewStyle } from "react-native"
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, SelectChipList, Text, TextField } from "../../components"
import { TextInput } from "react-native"
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
  uid: string
}

type UpdatePersonalProps = AppStackScreenProps<"UpdatePersonal">
export const UpdatePersonal: FC<UpdatePersonalProps> = observer(function UpdatePersonalScreen() {
  const { doLogout, user } = useAuth()

  console.info("user", user)
  const [details, sDetails] = useState<UpdateUser>({
    name: user.name,
    medicalInfo: [],
    allergies: [],
    uid: "",
  })

  async function loadUser() {
    const user = await load("user")
    sDetails({
      name: user.name ?? "",
      medicalInfo: user.medicalInfo ?? "",
      allergies: user.allergies ?? [],
      uid: user.uid ?? [],
    })
  }

  const foodAllergies = SelectListHook({
    options: user.allergies,
  })

  const medicalCond = SelectListHook({
    options: user.medicalInfo,
  })

  React.useEffect(() => {
    user.allergies.forEach((a) => {
      foodAllergies.updateSelected(a)
    })

    user.medicalInfo.forEach((m) => {
      medicalCond.updateSelected(m)
    })
  }, [])

  const isNameInvalid = details.name.length === 0

  const $container: ViewStyle = {
    width: "100%",
    paddingRight: 10,
    alignContent: "center",
    flexGrow: 1,
    flexDirection: "column",
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
            value={details.name}
            placeholder={"name"}
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
              await doLogout()
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
              if (details.uid.length !== 0)
                await updateUser(
                  {
                    ...details,
                    medicalInfo: Array.from(medicalCond.values.selected),
                    allergies: Array.from(foodAllergies.values.selected),
                    uid: details.uid ?? "",
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
