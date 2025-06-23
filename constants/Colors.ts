/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { fonts } from "./Fonts";

export const colors = {
  dark: true,
  colors: {
    background: "rgba(29, 29, 29, 0.95)",
    card: "rgba(24, 24, 24, 0.7)",
    primary: "rgb(47, 201, 20)", // primary accents (buttons, headers, key highlights, etc)
    text: "rgb(252, 252, 252)",
    border: "rgba(255, 255, 255, 0.05)",
    notification: "rgba(255, 69, 58, 1)",
  },
  fonts,
};
