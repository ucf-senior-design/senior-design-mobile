import { View } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useAuth } from "../models/hooks/authentication"

type AccountProps = AppStackScreenProps<"Account">
export const Account: FC<AccountProps> = observer(function ViewTripScreen() {
  const { doLogout } = useAuth()
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <Icon
          icon="personSmall"
          style={{
            width: "100%",
          }}
        />
        <Text text="Account screen" />
        <Button text="logout" onPress={() => doLogout()} />
      </View>
    </Screen>
  )
})
