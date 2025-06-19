import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TextProps } from "react-native";

interface ThemedTextProps extends TextProps {
  type?: "default" | "title" | "subtitle" | "link";
}

export function ThemedText(props: ThemedTextProps) {
  const { style, type = "default", ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <Text
      style={[
        type === "default" && { fontSize: 16 } && { color: colors.text },
        ,
        type === "title" && {
          fontSize: 32,
          fontWeight: "bold",
          color: colors.primary,
        },
        ,
        ,
        type === "subtitle" && { fontSize: 20, fontWeight: "600" } && {
            color: colors.text,
          },
        ,
        type === "link" && {
            color: colors.primary,
            textDecorationLine: "underline",
          } && { color: colors.text },
        ,
        style, // override
      ]}
      {...otherProps}
    />
  );
}
