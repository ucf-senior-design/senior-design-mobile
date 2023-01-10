import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Screen, Text, TextField, Button } from "../../components"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import * as EmailValidator from "email-validator"
import ThirdPartyAuth from "../../components/authentication/ThirdPartyAuth"
import { useAuth } from "../../models/hooks"
type LoginProps = AppStackScreenProps<"Login">

export const Login: FC<LoginProps> = observer(function LoginScreen() {
  const [errorMessage, sErrorMessage] = useState("")
  const [user, sUser] = useState({
    email: "",
    password: "",
  })
  const { doEmailPasswordLogin } = useAuth()
  const isEmailInvalid = user.email.length === 0 || !EmailValidator.validate(user.email)

  async function handleLogin() {
    await doEmailPasswordLogin(user, (response) => {
      if (response.isSuccess) {
        navigate("Landing")
      } else {
        sErrorMessage(response.errorMessage)
        return
      }
    })
  }

  return (
    <>
      <Screen
        preset="fixed"
        statusBarStyle="light"
        backgroundImage={require("../../../assets/images/gradientBg.png")}
        goBackHeader={true}
      >
        <View style={$container}>
          <Text preset="heading" text="hello!" style={{ textAlign: "center" }} />

          {errorMessage.length === 0 && (
            <Text
              preset="subheading"
              text="log in to continue managing your trips!"
              style={{ textAlign: "center" }}
            />
          )}
          {errorMessage.length > 0 && (
            <Text
              preset="subheading"
              text={errorMessage}
              style={{ color: colors.errorText, marginBottom: spacing.small }}
            />
          )}

          <TextField
            status={isEmailInvalid ? "error" : undefined}
            helper={isEmailInvalid ? "invalid email" : undefined}
            value={user.email}
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
            value={user.password}
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
          <ThirdPartyAuth />
          <Button text="log in" onPress={() => handleLogin()} />
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
