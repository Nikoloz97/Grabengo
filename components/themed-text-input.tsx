import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { ThemedText } from "./themed-text";

interface ThemedTextInputProps extends TextInputProps {
  error: string | undefined;
}

export function ThemedTextInput(props: ThemedTextInputProps) {
  const {
    style,
    placeholder,
    keyboardType = "default",
    error,
    ...otherProps
  } = props;
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholderTextColor={colors.border}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[
          {
            fontSize: 18,
            fontFamily: "DMSans_600SemiBold",
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: colors.border,
            color: colors.text,
            paddingVertical: 5,
          },
          style, // overrides
        ]}
        {...otherProps}
      />
      <View style={{ minHeight: 20, marginBottom: 16 }}>
        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
      </View>
    </View>
  );
}
