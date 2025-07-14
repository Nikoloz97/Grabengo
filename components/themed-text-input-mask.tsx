import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";

export function ThemedTextInputMask(props: TextInputMaskProps) {
  const { style, placeholder, keyboardType = "default", ...otherProps } = props;
  const { colors } = useTheme();

  return (
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
