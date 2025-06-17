import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
  type?: "background" | "card" | "header";
}

export function ThemedView(props: ThemedViewProps) {
  const { style, type, ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <View
      style={[
        type === "background" && { backgroundColor: colors.background },
        type === "card" && { backgroundColor: colors.card },
        type === "header" && { backgroundColor: colors.card },
        style, // overrides
      ]}
      {...otherProps}
    />
  );
}
