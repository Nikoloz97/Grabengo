import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInputProps, TouchableOpacity, View } from "react-native";
import { ThemedTextInput } from "./themed-text-input";

export function ThemedSecureTextInput(props: TextInputProps) {
  const { style, placeholder, keyboardType = "default", ...otherProps } = props;
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: colors.border,
        marginBottom: 16,
      }}
    >
      <ThemedTextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={!isVisible}
        style={{ flex: 1, borderBottomWidth: 0, marginBottom: 0 }}
        {...otherProps}
      />
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <MaterialIcons
          name={isVisible ? "visibility-off" : "visibility"}
          size={22}
          color={colors.border}
        />
      </TouchableOpacity>
    </View>
  );
}
