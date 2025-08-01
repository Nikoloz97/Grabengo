import React from "react";
import { Text as RNText, TextProps } from "react-native";

export function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: "DMSans_600SemiBold" }, props.style]}
    />
  );
}
