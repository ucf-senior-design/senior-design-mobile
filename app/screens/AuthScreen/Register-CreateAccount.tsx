import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { Screen, Text, TextField, Button, Icon } from "../../components"
import ThirdPartyAuth from "../../components/authentication/ThirdPartyAuth"
import { AppStackScreenProps } from "../../navigators/AppNavigator"
import { colors, spacing } from "../../theme"
import { BoxPasswordStrengthDisplay } from "react-native-password-strength-meter"
import * as EmailValidator from "email-validator"
import { navigate } from "../../navigators"
import { useAuth } from "../../models/hooks"

type RegisterProps = AppStackScreenProps<"CreateAccount">
export const CreateAccount: FC<RegisterProps> = observer(function CreateAccount() {
  const [user, sUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errorMessage, sErrorMessage] = useState("")

  const isConfirmPasswordInvalid =
    user.password !== user.confirmPassword || user.confirmPassword.length === 0

  const isEmailInvalid = user.email.length === 0 || !EmailValidator.validate(user.email)

  const { doEmailPasswordRegister } = useAuth()
  async function maybeRegister() {
    doEmailPasswordRegister(
      {
        email: user.email,
        password: user.password,
      },
      (response) => {
        sErrorMessage(response.errorMessage)
      },
    )
  }

  const levels = [
    {
      label: "Weak",
      labelColor: "#ff2900",
      activeBarColor: "#ff2900",
    },

    {
      label: "Okay",
      labelColor: "#FFA500",
      activeBarColor: "#FFA500",
    },

    {
      label: "Strong",
      labelColor: "#f3d331",
      activeBarColor: "#f3d331",
    },

    {
      label: "Very Strong",
      labelColor: "#00ff6b",
      activeBarColor: "#00ff6b",
    },
  ]
  return (
    <Screen
      preset="fixed"
      statusBarStyle="light"
      backgroundImage={require("../../../assets/images/gradientBg.png")}
      goBackHeader={true}
    >
      <View style={$container}>
        <Text
          preset="heading"
          text="create account"
          style={{ textAlign: "center", marginBottom: spacing.extraSmall }}
        />
        <Text preset="subheading" text={errorMessage} style={{ color: colors.errorText }} />

        <TextField
          status={isEmailInvalid ? "error" : undefined}
          helper={isEmailInvalid ? "invalid email" : undefined}
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
          inputWrapperStyle={{ marginBottom: 0 }}
          onChangeText={(e) =>
            sUser((user) => ({
              ...user,
              password: e,
            }))
          }
        />

        <BoxPasswordStrengthDisplay
          minLength={0}
          boxContainerStyle={{ marginBottom: spacing.medium }}
          boxStyle={{ borderRadius: 2 }}
          levels={levels}
          password={user.password}
          width={Dimensions.get("window").width - 50}
        />

        <TextField
          status={isConfirmPasswordInvalid ? "error" : undefined}
          helper={isConfirmPasswordInvalid ? "does not match password" : undefined}
          label="confirm password"
          placeholder="password"
          canBeHidden={true}
          onChangeText={(e) =>
            sUser((user) => ({
              ...user,
              confirmPassword: e,
            }))
          }
        />

        <ThirdPartyAuth />
        <Button
          disabled={isConfirmPasswordInvalid || isEmailInvalid}
          style={{ alignSelf: "flex-end", marginTop: spacing.small }}
          text="continue"
          RightAccessory={() => <Icon icon="caretRight" color="white" />}
          onPress={async () => await maybeRegister()}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
}
