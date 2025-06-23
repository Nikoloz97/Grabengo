import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { View, ViewProps } from "react-native";

export function ThemedHeaderView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          marginBottom: 50,
          overflow: "hidden", // for blur effect
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style, // overrides
      ]}
      {...otherProps}
    >
      <BlurView
        intensity={10}
        tint="default"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      {props.children}
    </View>
  );
}
