import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ViewProps } from "react-native";

export function ThemedHeaderView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          marginBottom: 50,
        },
        style, // overrides
      ]}
      {...otherProps}
    />
  );
}
