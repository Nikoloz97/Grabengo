import { BlurView } from "expo-blur";
import React from "react";
import { Platform, View, ViewProps } from "react-native";

export function ThemedHeaderView(props: ViewProps) {
  const { style, ...otherProps } = props;

  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "rgb(0, 0, 0)",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
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
          backgroundColor: "rgba(37, 37, 37, 0.95)",
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
          ...shadowStyle,
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
