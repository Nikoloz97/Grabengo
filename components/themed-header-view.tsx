import { useTheme } from "@react-navigation/native";
import React from "react";
import { Platform, View, ViewProps } from "react-native";

export function ThemedHeaderView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          borderRadius: 0,
          padding: 0,
          marginBottom: 0,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
            },
            android: {
              elevation: 8, // shadow elevation
            },
          }),
        },
        style, // overrides
      ]}
      {...otherProps}
    />
  );
}
