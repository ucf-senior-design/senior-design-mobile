// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#D4DBEC",
  neutral300: "#95A4D0",
  neutral400: "#556DB3",
  neutral500: "#264290",
  neutral600: "#564E4A",
  neutral700: "#1D3370",
  neutral800: "#111D40",
  neutral900: "#080F20",
  neutral1000: "#333145",

  primary100: "#EDF2F9",
  primary200: "#C9D8EE",
  primary300: "#A6BFE3",
  primary400: "#82A5D7",
  primary500: "#5E8BCC",
  primary600: "#3D659E",

  secondary100: "##FFA248",
  secondary200: "#FB923C",
  secondary300: "#FB923C",
  secondary400: "#CB5C39",
  secondary500: "#9E3734",

  accent100: "#6E5A7E",
  accent200: "#604C72",
  accent300: "#442F59",
  accent400: "#36214C",
  accent500: "#36214C",

  angry100: "#E1AAB1",
  angry300: "#95626B",
  angry500: "#FF2900",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  white: "#FFFFFF",

  inputText: "#111D40",
  inputField: "#FFFFFF",
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral100,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral200,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral900,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  errorText: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorTextDim: palette.angry500,
  errorBackground: palette.neutral100,
}
