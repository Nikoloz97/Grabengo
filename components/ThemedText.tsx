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
        { color: colors.text },
        type === "default" && { fontSize: 16 },
        type === "title" && {
          fontSize: 32,
          fontWeight: "bold",
        },
        ,
        type === "subtitle" && { fontSize: 20, fontWeight: "600" },
        type === "link" && {
          color: colors.primary,
          textDecorationLine: "underline",
        },
        style, // override
      ]}
      {...otherProps}
    />
  );
}
