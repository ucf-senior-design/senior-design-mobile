import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageStyle, Image, View, ViewStyle } from "react-native"
import { Header, Screen, Text, TextField, Button } from "../components"
import { AppStackScreenProps } from "../navigators/AppNavigator"
import { colors, spacing, typography } from "../theme"

interface LoginProps extends AppStackScreenProps<"Login"> {}

export const Login: FC<LoginProps> = observer(function LoginScreen({ navigation }) {
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
          <TextField label="email" placeholder="email@domain.com" />

          <TextField
            label="password"
            placeholder="password"
            canBeHidden={true}
            inputWrapperStyle={{ marginBottom: 0 }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              marginBottom: spacing.medium,
            }}
          >
            <Button
              preset="noFill"
              text="forgot password?"
              textStyle={{ fontSize: 10 }}
              style={{ justifyContent: "flex-end", margin: 0, padding: 0 }}
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
