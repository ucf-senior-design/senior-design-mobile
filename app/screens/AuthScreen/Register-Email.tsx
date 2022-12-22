import React from "react"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { AppStackScreenProps } from "../../navigators"
import { Screen, SendEmail } from "../../components"

interface EmailProps extends AppStackScreenProps<"Email"> {}
export const Email: FC<EmailProps> = observer(function Email() {
  return (
    <Screen
      preset="fixed"
      statusBarStyle="light"
      backgroundImage={require("../../../assets/images/gradientBg.png")}
      goBackHeader={true}
    >
      <SendEmail purpose="emailVerify" />
    </Screen>
  )
})
