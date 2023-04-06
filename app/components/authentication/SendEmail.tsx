import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { Text, Button, Icon } from ".."
import { useAuth } from "../../models/hooks"
import { navigate } from "../../navigators"
import { spacing } from "../../theme"
export function SendEmail({ purpose }: { purpose: "emailVerify" | "passwordReset" }) {
  const { sendEmailVerification, sendPasswordReset } = useAuth()
  const title = purpose === "emailVerify" ? "almost there!" : "password reset"
  const message =
    purpose === "emailVerify"
      ? "Check your email and click on the link we sent to activiate your account."
      : "Check your email for a link to reset your password."
  React.useEffect(() => {
    handleEmailSend()
  }, [])

  async function handleEmailSend() {
    if (purpose === "emailVerify") {
      sendEmailVerification((response) => {
        `if (!response.isSuccess) {
          alert(response.errorMessage)
        }`
      })
    }
    if (purpose === "passwordReset") {
      sendPasswordReset((response) => {
        if (!response.isSuccess) {
          alert(response.errorMessage)
        } else {
          alert("Password reset email sent.")
        }
      })
    }
  }
  return (
    <View style={$screen}>
      <View style={$component}>
        <Icon icon="email" style={{ marginBottom: spacing.medium }} />
        <Text preset="title" text={title} />
        <Text style={{ marginBottom: spacing.medium }} preset="subheading" text={message} />
        {purpose === "emailVerify" && <Button text="Login" onPress={() => navigate("Login")} />}
        <Button text="Resend Email" preset="filled" onPress={() => handleEmailSend()} />
      </View>
    </View>
  )
}

const $screen: StyleProp<ViewStyle> = {
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
}

const $component: StyleProp<ViewStyle> = {
  flexDirection: "column",
  height: "100%",
  width: "100%",
  alignContent: "center",
  justifyContent: "center",
}
