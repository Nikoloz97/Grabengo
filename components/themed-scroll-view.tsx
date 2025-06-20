import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";

interface ThemedScrollViewProps extends ScrollViewProps {
  type?: "default";
}

export function ThemedScrollView(props: ThemedScrollViewProps) {
  const { style, type = "default", ...otherProps } = props;

  return (
    <ScrollView
      contentContainerStyle={[
        type === "default" && {
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 80,
        },
        style, // override
      ]}
      {...otherProps}
    />
  );
}
