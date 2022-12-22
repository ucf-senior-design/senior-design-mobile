import React, { ComponentType, forwardRef, Ref, useImperativeHandle, useRef, useState } from "react"
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Icon } from "."
import { isRTL, translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"

export interface TextFieldAccessoryProps {
  style: StyleProp<any>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * Allows input to be hidden and unhid. Also auto sets any icons for this
   */
  canBeHidden?: boolean
  /**
   * Adds theming for a background that will always be white ex: popup
   */
  whiteBackground?: boolean
  /**
   * Centers label with bold preset.
   */
  labelCenter?: boolean
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    canBeHidden,
    whiteBackground,
    labelCenter,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...TextInputProps
  } = props

  const RightAccessory = canBeHidden ? GetHiddenIcon() : props.RightAccessory
  const [isHidden, setIsHidden] = useState(false)

  const input = useRef<TextInput>()

  const disabled = TextInputProps.editable === false || status === "disabled"

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const $containerStyles = [
    $containerStyleOverride,
    status === "error" && { marginVertical: spacing.extraSmall },
  ]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    whiteBackground && {
      backgroundColor: colors.palette.primary100,
      borderWidth: 0,
    },
    status === "error" && { backgroundColor: colors.errorBackground, marginBottom: 0 },
    TextInputProps.multiline && { minHeight: 112, color: colors.errorText },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ]

  const $inputStyles = [
    $inputStyle,
    status === "error" && { color: colors.errorText },
    disabled && { color: colors.textDim },
    isRTL && { textAlign: "right" as TextStyle["textAlign"] },
    TextInputProps.multiline && { height: "auto" },
    $inputStyleOverride,
  ]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.errorTextDim },
    HelperTextProps?.style,
  ]

  function focusInput() {
    if (disabled) return

    input.current?.focus()
  }

  function GetHiddenIcon() {
    const HiddenAccessory = () => (
      <Icon
        icon={isHidden ? "hidden" : "view"}
        containerStyle={[$rightAccessoryStyle]}
        color={colors.palette.neutral900}
        onPress={() => setIsHidden(!isHidden)}
      />
    )

    return HiddenAccessory
  }

  useImperativeHandle(ref, () => input.current)

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!(label || labelTx) && (
        <Text
          preset={labelCenter ? "bold" : "formLabel"}
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={[$labelStyles, whiteBackground && { color: "black", textAlign: "center" }]}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline}
          />
        )}

        <TextInput
          autoCapitalize="none"
          secureTextEntry={canBeHidden ? !!isHidden : false}
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={status !== "error" ? colors.textDim : colors.errorTextDim}
          {...TextInputProps}
          editable={!disabled}
          style={[$inputStyles, { width: "100%" }]}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline}
          />
        )}
      </View>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </TouchableOpacity>
  )
})

const $labelStyle: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  borderWidth: 1,
  width: "100%",
  borderRadius: 4,
  backgroundColor: colors.palette.inputField,
  borderColor: colors.palette.neutral400,
  overflow: "hidden",
  marginBottom: spacing.medium,
}

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: "stretch",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: typography.primary.normal,
  color: colors.palette.inputText,
  fontSize: 14,
  height: 30,
  width: "100%",
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 5,
  paddingHorizontal: 0,
  marginVertical: spacing.extraSmall,
  marginHorizontal: spacing.small,
}

const $helperStyle: TextStyle = {
  marginTop: spacing.extraSmall,
  fontSize: 12,
}

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.extraSmall,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.extraSmall,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
