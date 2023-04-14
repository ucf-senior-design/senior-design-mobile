import React from "react"
import { Button, Icon, Text, TextField } from "."
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { SelectListHook } from "../models/hooks"
import { BackdropModal } from "./BackdropModal"

export interface SelectChipListProps {
  updateSelected: (value: string) => void
  options: Map<string, boolean>
}

export function SelectChipList({
  hook,
  label,
  propertyName,
}: {
  /**
   * Handles all operations to handle selecting options.
   */
  hook: SelectListHook
  /**
   * Label for the form.
   */
  label: string
  /**
   * Property name to be used in popup ( should be singular)
   */
  propertyName: string
}) {
  const chips = []

  hook.values.options.forEach((option, index) => {
    chips.push(
      <Pressable
        key={index}
        onPress={() => hook.updateSelected(option)}
        style={[$chip, hook.isSelected(option) && { backgroundColor: "#4262BF" }]}
      >
        <View>
          <Text text={option} preset="bold" style={{ fontSize: 12 }} />
        </View>
      </Pressable>,
    )
  })

  return (
    <>
      <View style={$container}>
        <View
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <Text text={label} style={$labelStyles} preset="formLabel" />
          <View
            style={{
              ...$addOption,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              style={{ width: 20, height: 20 }}
              icon="add"
              color={colors.text}
              onPress={() => hook.togglePopUp()}
            />
          </View>
        </View>

        <View style={$chipContainer}>{chips}</View>
      </View>
      <BackdropModal isVisible={hook.values.isPopUpVisible} toggleShow={() => hook.togglePopUp()}>
        <TextField
          whiteBackground
          label={`add ${propertyName}`}
          labelCenter
          onChangeText={(e) => {
            hook.updateOptionInput(e)
          }}
        />
        <Button text="Add" preset="reversed" onPress={() => hook.addOption()} />
      </BackdropModal>
    </>
  )
}

const $addOption: ViewStyle = {
  margin: 4,
  padding: 2,
}

const $chipContainer: ViewStyle = {
  flexWrap: "wrap",
  flexDirection: "row",
  width: "100%",
  alignContent: "center",
  alignItems: "center",
  marginVertical: spacing.extraSmall,
}

const $labelStyles: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $chip: ViewStyle = {
  margin: 4,
  backgroundColor: "#283051",
  paddingVertical: 8,
  paddingHorizontal: 20,

  borderRadius: 3,
  alignSelf: "center",
}

const $container: ViewStyle = {
  flexDirection: "column",
  width: "100%",
}
