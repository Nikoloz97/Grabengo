import { useTheme } from "@react-navigation/native";
import React from "react";
import { KeyboardTypeOptions, TextInput, TextInputProps } from "react-native";

interface ThemedTextInputProps extends TextInputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export function ThemedTextInput(props: ThemedTextInputProps) {
  const {
    style,
    placeholder,
    secureTextEntry = false,
    keyboardType = "default",
    ...otherProps
  } = props;
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
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      {...otherProps}
    />
  );
}
