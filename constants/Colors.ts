/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { fonts } from "./Fonts";

export const colors = {
  dark: true,
  // TODO: create one for button? If its too hard, make primary be button
  colors: {
    primary: "rgb(0, 0, 0)",
    background: "rgb(36, 36, 36)",
    card: "rgba(1, 1, 1, 0.50)",
    text: "#39FF14",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
  fonts,
};
