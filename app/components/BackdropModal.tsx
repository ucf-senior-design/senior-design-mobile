import React from "react"
import { View, ViewStyle } from "react-native"
import Modal from "react-native-modal"
import { spacing } from "../theme"
interface BackdropModalProps {
  isVisible: boolean
  toggleShow: () => void
  children: React.ReactNode
}
/**
 * Creates a modal with a backdrop.
 * @param {boolean} isVisible whether or not modal is visible
 * @param {Function} toggleShow toggles the modal from being visible
 * @param {React.ReactNode} children React element to appear within the modal
 */
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
