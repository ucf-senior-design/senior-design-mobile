import React from "react"
import { View, ViewStyle } from "react-native"
import Modal from "react-native-modal"
import { Text } from "."
import { spacing } from "../theme"
interface BackdropModalProps {
  isVisible: boolean
  toggleShow: () => void
  children: React.ReactNode
}
export function BackdropModal(props: BackdropModalProps) {
  const { isVisible, toggleShow, children } = props
  return (
    <>
      <Modal isVisible={isVisible} onBackdropPress={() => toggleShow()}>
        <View style={$childrenWrapper}>{children}</View>
      </Modal>
    </>
  )
}

const $childrenWrapper: ViewStyle = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  padding: spacing.large,
  width: "100%",
}
