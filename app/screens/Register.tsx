import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Header, Screen, Text, TextField, Button } from "../components"
import { AppStackScreenProps } from "../navigators/AppNavigator"
import { colors } from "../theme"

interface RegisterProps extends AppStackScreenProps<"Register"> {}
export const Register: FC<RegisterProps> = observer(function LoginScreen({ navigation }) {
  return (
    <>
      <Header
        leftIcon={"back"}
        leftIconColor={colors.text}
        onLeftPress={() => navigation.goBack()}
      />
      <Screen preset="fixed">
        <View style={$container}>
          <Text preset="heading" text="hello!" style={{ textAlign: "center" }} />
          <Text
            preset="subheading"
            text="log in to continue managing your trips!"
            style={{ textAlign: "center" }}
          />
          <TextField label="email" placeholder="email@domain.com" />
          {/* <HiddenFiled label="passowrd" placeholder="password" /> */}
          <TextField label="password" placeholder="password" />
          <Button text="log in" />
        </View>
      </Screen>
    </>
  )
})

const $container: ViewStyle = {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
}
