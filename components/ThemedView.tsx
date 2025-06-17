import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
  // TODO: add variants here eventually (e.g. type?: 'background' | 'card' | 'header';)
}

export function ThemedView(props: ThemedViewProps) {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: colors.background },
        style, // overrides
      ]}
      {...otherProps}
    />
  );
}
