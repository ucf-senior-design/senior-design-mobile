import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Screen, Text, TextField, Button, Icon } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"
import * as EmailValidator from "email-validator"
interface LoginProps extends AppStackScreenProps<"Login"> {}

export const Login: FC<LoginProps> = observer(function LoginScreen({ navigation }) {
  const [errorMessage, sErrorMessage] = useState("")
  const [user, sUser] = useState({
    email: "",
    password: "",
  })

  const isEmailInvalid = user.email.length === 0 || !EmailValidator.validate(user.email)
  return (
    <>
      <Screen
        preset="fixed"
        statusBarStyle="light"
        backgroundImage={require("../../assets/images/gradientBg.png")}
        goBackHeader={true}
      >
        <View style={$container}>
          <Text preset="heading" text="hello!" style={{ textAlign: "center" }} />
          <Text
            preset="subheading"
            text="log in to continue managing your trips!"
            style={{ textAlign: "center" }}
          />
          <TextField
            status={isEmailInvalid ? "error" : undefined}
            helper={isEmailInvalid ? "invalid email" : undefined}
            inputWrapperStyle={isEmailInvalid && { marginBottom: 0 }}
            containerStyle={isEmailInvalid && { marginVertical: spacing.extraSmall }}
            label="email"
            placeholder="email@domain.com"
            onChangeText={(e) =>
              sUser((user) => ({
                ...user,
                email: e,
              }))
            }
          />

          <TextField
            label="password"
            placeholder="password"
            canBeHidden={true}
            onChangeText={(e) =>
              sUser((user) => ({
                ...user,
                password: e,
              }))
            }
            inputWrapperStyle={{ marginBottom: 0 }}
          />
          <View
            style={{
              marginBottom: spacing.medium,
            }}
          >
            <Button
              preset="noFill"
              text="forgot password?"
              textStyle={{ fontSize: 10 }}
              style={{ justifyContent: "flex-end", margin: 0 }}
            />
          </View>
          <Button text="log in" />
        </View>
      </Screen>
    </>
  )
})

const $container: ViewStyle = {
  height: "100%",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
}
