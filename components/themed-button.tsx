import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  type?: "primary" | "secondary" | "danger";
  textStyle?: any;
}

export function ThemedButton(props: ThemedButtonProps) {
  const { style, type = "primary", title, textStyle, ...otherProps } = props;
  const { colors } = useTheme();

  const getButtonStyle = () => {
    switch (type) {
      case "primary":
        return {
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          alignItems: "center" as const,
        };
      case "secondary":
        return {
          backgroundColor: colors.card,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          alignItems: "center" as const,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case "danger":
        return {
          backgroundColor: colors.notification,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          alignItems: "center" as const,
        };
      default:
        return {};
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "primary":
        return {
          color: "#ffffff",
          fontSize: 16,
          fontWeight: "600",
        };
      case "secondary":
        return {
          color: colors.text,
          fontSize: 16,
          fontWeight: "600" as const,
        };
      case "danger":
        return {
          color: "#ffffff",
          fontSize: 16,
          fontWeight: "600" as const,
        };
      default:
        return { color: colors.text };
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        style,
        Platform.select({
          ios: {
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          },
          android: {
            elevation: 4,
          },
        }),
      ]}
      {...otherProps}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
