import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
  type?: "background" | "card" | "title";
}

export function ThemedView(props: ThemedViewProps) {
  const { style, type, ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <View
      style={[
        type === "background" && {
          backgroundColor: colors.background,
        },
        type === "card" && {
          backgroundColor: colors.card,
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
        },
        style, // overrides
      ]}
      {...otherProps}
    />
  );
}
