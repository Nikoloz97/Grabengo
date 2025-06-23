import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, View, ViewProps } from "react-native";

export function ThemedHeaderView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();

  // Shadow styles for iOS and Android
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "rgba(0,0,0)",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
  });

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
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          ...shadowStyle, // Add shadow style here
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
