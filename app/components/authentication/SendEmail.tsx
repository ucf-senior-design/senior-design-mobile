import React from "react"
import { View } from "react-native"
import { Text, Button, Icon } from ".."
import { spacing } from "../../theme"
export function SendEmail({ purpose }: { purpose: "emailVerify" | "passwordReset" }) {
  const title = purpose === "emailVerify" ? "almost there!" : "password reset"

  return (
    <View
      style={{
        height: "100%",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Icon icon="email" style={{ marginBottom: spacing.medium }} />
        <Text preset="title" text={title} />
        <Text
          style={{ marginBottom: spacing.medium }}
          preset="subheading"
          text={"Check your email and click on the link we sent to activiate your account."}
        />

        <Button text="Login" />
        <Button text="Resend Email" preset="filled" />
      </View>
    </View>
  )
}
