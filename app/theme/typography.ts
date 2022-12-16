import { Platform } from "react-native"
import {
  Spartan_300Light as SpartanLight,
  Spartan_400Regular as SpartanRegular,
  Spartan_500Medium as SpartanMedium,
  Spartan_600SemiBold as SpartanSemiBold,
  Spartan_700Bold as SpartanBold,
} from "@expo-google-fonts/spartan"

export const customFontsToLoad = {
  SpartanLight,
  SpartanRegular,
  SpartanMedium,
  SpartanSemiBold,
  SpartanBold,
}

const fonts = {
  Spartan: {
    // Cross-platform Google font.
    light: "SpartanLight",
    normal: "SpartanRegular",
    medium: "SpartanMedium",
    semiBold: "SpartanSemiBold",
    bold: "SpartanBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.Spartan,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
