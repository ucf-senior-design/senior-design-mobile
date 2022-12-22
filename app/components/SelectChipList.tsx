import React, { useState } from "react"
import { Button, Icon, Text, TextField } from "."
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { SelectListHook } from "../hooks"
import { BackdropModal } from "./BackdropModal"

interface SelectChipProps {
  value: string
  isSelected: boolean
  onPress: () => void
}
function SelectChip(props: SelectChipProps) {
  const { value, isSelected, onPress } = props
  return (
    <Pressable
      onPress={() => onPress()}
      style={[$chip, isSelected && { backgroundColor: "#4262BF" }]}
    >
      <View>
        <Text text={value} preset="bold" style={{ fontSize: 12 }} />
      </View>
    </Pressable>
  )
}

export interface SelectChipListProps {
  updateSelected: (value: string) => void
  options: Map<string, boolean>
}
export function SelectChipList({
  hook,
  label,
  propertyName,
}: {
  hook: SelectListHook
  label: string
  propertyName: string
}) {
  const chips = []

  hook.values.options.forEach((option, index) => {
    chips.push(
      <SelectChip
        key={index}
        isSelected={hook.isSelected(option)}
        value={option}
        onPress={() => hook.updateSelected(option)}
      />,
    )
  })

  return (
    <>
      <View style={$container}>
        <Text text={label} style={$labelStyles} preset="formLabel" />
        <View style={$chipContainer}>
          {chips}
          <View style={$addOption}>
            <Icon icon="more" color={colors.text} onPress={() => hook.togglePopUp()} />
          </View>
        </View>
      </View>
      <BackdropModal isVisible={hook.values.isPopUpVisible} toggleShow={() => hook.togglePopUp()}>
        <TextField
          whiteBackground
          label={`add ${propertyName} value`}
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
  backgroundColor: "rgba(37, 50, 86,.9)",
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 3,
  alignSelf: "center",
}
const $container: ViewStyle = {
  flexDirection: "column",
  width: "100%",
}
