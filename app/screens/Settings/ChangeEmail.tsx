import { ScrollView, View, ViewStyle } from "react-native"
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text, TextField } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { Avatar } from "@ui-kitten/components"
import { spacing } from "../../theme"
import { load } from "../../utils/storage"

type ChangeEmail = {
  email: string
  confirmEmail: string
}

type ChangeEmailProps = AppStackScreenProps<"ChangeEmail">
export const ChangeEmail: FC<ChangeEmailProps> = observer(function ChangeEmailScreen() {
  const [details, sDetails] = useState<ChangeEmail>({
    email: "",
    confirmEmail: "",
  })

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
  React.useEffect(() => {
    getStoredUserInfo()
  }, [])

  const isEmailInvalid = details.email.length === 0
  const isNotEmailSame = details.email !== details.confirmEmail

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
        <Avatar
          style={{ borderRadius: 100, minWidth: "30%", minHeight: 100 }}
          source={{
            uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={$container} contentContainerStyle={$container} centerContent={true}>
          <Text
            text="Change your email"
            preset="title"
            style={{ textAlign: "center", fontSize: 25 }}
          />
          <TextField
            status={isEmailInvalid ? "error" : undefined}
            helper={isEmailInvalid ? "Email not Valid" : undefined}
            value={details.email}
            label="New Email"
            onChangeText={(e) =>
              sDetails((details) => ({
                ...details,
                email: e,
              }))
            }
          />
          <TextField
            status={isNotEmailSame ? "error" : undefined}
            helper={isNotEmailSame ? "Emails do not match" : undefined}
            value={details.confirmEmail}
            label="Confirm Email"
            onChangeText={(e) =>
              sDetails((details) => ({
                ...details,
                confirmEmail: e,
              }))
            }
          />
          <Button
            disabled={isEmailInvalid || isNotEmailSame}
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
