import { useScrollToTop } from "@react-navigation/native"
import { StatusBar, StatusBarProps } from "expo-status-bar"
import React, { useRef, useState } from "react"
import {
  ImageBackground,
  ImageSourcePropType,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"
import { Header } from "."
import { colors } from "../theme"
import { goBack } from "../navigators"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import TabNavigator from "./TabNavigator"

interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: "light" | "dark"
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  StatusBarProps?: StatusBarProps
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
  // TODO: add Gradient background for all page types
  /**
   * Add Gradient background to screen. Will only show currently if page is fixed
   */
  backgroundImage?: ImageSourcePropType
  /**
   * Adds background color when a background image is present
   */
  backgroundColorWithImage?: string
  /**
   * Adds a header with a back button
   */
  goBackHeader?: boolean
  /**
   * Enables or disables bottom tab navigation
   */
  showNavBar?: boolean
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: "fixed"
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: "scroll"
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  ScrollViewProps?: ScrollViewProps
}

interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
  preset?: "auto"
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps

const isIos = Platform.OS === "ios"

function isNonScrolling(preset?: ScreenProps["preset"]) {
  return !preset || preset === "fixed"
}

function useAutoPreset(props: AutoScreenProps) {
  const { preset, scrollEnabledToggleThreshold } = props
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {}

  const scrollViewHeight = useRef(null)
  const scrollViewContentHeight = useRef(null)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  function updateScrollState() {
    if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return scrollViewContentHeight.current < scrollViewHeight.current - point
      } else {
        return scrollViewContentHeight.current < scrollViewHeight.current * percent
      }
    })()

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false)

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true)
  }

  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h
    updateScrollState()
  }

  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout
    // update scroll-view  height
    scrollViewHeight.current = height
    updateScrollState()
  }

  // update scroll state on every render
  if (preset === "auto") updateScrollState()

  return {
    scrollEnabled: preset === "auto" ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  }
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, contentContainerStyle, children } = props
  return (
    <View style={[$outerStyle, style]}>
      <View style={[$innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps

  const ref = useRef<ScrollView>()

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props as AutoScreenProps)

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref)

  return (
    <ScrollView
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e)
        ScrollViewProps?.onLayout?.(e)
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h)
        ScrollViewProps?.onContentSizeChange?.(w, h)
      }}
      style={[$outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[
        $innerStyle,
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  )
}

export function Screen(props: ScreenProps) {
  const {
    backgroundColor = colors.background,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps,
    statusBarStyle = "dark",
    backgroundColorWithImage = colors.transparent,
    showNavBar,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)
  const $image: ViewStyle = {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: backgroundColorWithImage,
  }
  if (props.preset === "fixed" && props.backgroundImage)
    return (
      <ImageBackground source={props.backgroundImage} resizeMode="cover" style={$image}>
        <StatusBar style={statusBarStyle} {...StatusBarProps} />
        <View style={[$containerStyle, $containerInsets]}>
          {props.goBackHeader ? (
            <Header
              leftIcon={"caretLeft"}
              leftIconColor={colors.text}
              onLeftPress={() => goBack()}
            />
          ) : (
            <></>
          )}
          <KeyboardAvoidingView
            behavior={isIos ? "padding" : undefined}
            keyboardVerticalOffset={keyboardOffset}
            {...KeyboardAvoidingViewProps}
            style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}
          >
            {isNonScrolling(props.preset) ? (
              <ScreenWithoutScrolling {...props} />
            ) : (
              <ScreenWithScrolling {...props} />
            )}
            {showNavBar ? (<TabNavigator/>) : null}
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    )
  return (
    <View style={[$containerStyle, { backgroundColor }, $containerInsets]}>
      {props.goBackHeader ? (
        <Header leftIcon={"caretLeft"} leftIconColor={colors.text} onLeftPress={() => goBack()} />
      ) : (
        <></>
      )}

      <StatusBar style={statusBarStyle} {...StatusBarProps} />
      <KeyboardAvoidingView
        behavior={isIos ? "padding" : undefined}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}
      >
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
        {showNavBar ? (<TabNavigator/>) : null}
      </KeyboardAvoidingView>
    </View>
  )
}

const $containerStyle: ViewStyle = { flex: 1, width: "100%", height: "100%" }

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
}

const $outerStyle: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 25,
  flex: 1,
  height: "100%",
  width: "100%",
}

const $innerStyle: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "stretch",
}
