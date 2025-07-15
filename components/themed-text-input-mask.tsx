import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";
import { ThemedText } from "./themed-text";

interface ThemedTextInputMaskProps extends TextInputMaskProps {
  error: string | undefined;
}

export function ThemedTextInputMask(props: ThemedTextInputMaskProps) {
  const {
    style,
    placeholder,
    keyboardType = "default",
    error,
    ...otherProps
  } = props;
  const { colors } = useTheme();

  return (
    <View>
      <TextInputMask
        style={[
          {
            fontFamily: "DMSans_600SemiBold",
            fontSize: 18,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: colors.border,
            color: colors.text,
            paddingVertical: 5,
          },
          style, // overrides
        ]}
        placeholderTextColor={colors.border}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...otherProps}
      />
      <View style={{ minHeight: 20, marginBottom: 16 }}>
        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
      </View>
    </View>
  );
}
