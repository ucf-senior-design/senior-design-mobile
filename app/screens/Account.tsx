import { View } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useAuth } from "../models/hooks/authentication"

type AccountProps = AppStackScreenProps<"Account">
export const Account: FC<AccountProps> = observer(function ViewTripScreen() {
  const { doLogout } = useAuth()
  const sample = [
    { time: "09:00", title: "Event 1", description: "Event 1 Description" },
    { time: "10:45", title: "Event 2", description: "Event 2 Description" },
    { time: "12:00", title: "Event 3", description: "Event 3 Description" },
    { time: "14:00", title: "Event 4", description: "Event 4 Description" },
    { time: "16:30", title: "Event 5", description: "Event 5 Description" },
  ]

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
