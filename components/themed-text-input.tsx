import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextInput, TextInputProps } from "react-native";

export function ThemedTextInput(props: TextInputProps) {
  const { style, placeholder, keyboardType = "default", ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <TextInput
      style={[
        {
          fontSize: 18,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: colors.border,
          color: colors.text,
          paddingVertical: 5,
          marginBottom: 16,
        },
        style, // overrides
      ]}
      placeholderTextColor={colors.border}
      placeholder={placeholder}
      keyboardType={keyboardType}
      {...otherProps}
    />
  );
}
