import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextProps } from "react-native";
import { Text } from "./index";

interface ThemedTextProps extends TextProps {
  type?: "default" | "title" | "subtitle" | "link" | "faint";
}

export function ThemedText(props: ThemedTextProps) {
  const { style, type = "default", ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <Text
      style={[
        type === "default" && { fontSize: 16, color: colors.text },
        type === "title" && {
          fontSize: 32,
          fontWeight: "bold",
          marginTop: 50,
          color: colors.primary,
        },
        type === "subtitle" && {
          fontSize: 25,
          fontWeight: "600",
          color: colors.text,
        },
        ,
        type === "link" && {
          color: colors.text,
          textDecorationLine: "underline",
        },
        type === "faint" && {
          color: colors.border,
        },
        style, // override
      ]}
      {...otherProps}
    />
  );
}
