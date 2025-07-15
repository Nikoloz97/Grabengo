import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";

interface ThemedSecureTextInputProps extends TextInputProps {
  error?: string;
}

export function ThemedSecureTextInput(props: ThemedSecureTextInputProps) {
  const {
    style,
    placeholder,
    keyboardType = "default",
    error,
    ...otherProps
  } = props;
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: colors.border,
          marginBottom: 16,
          width: "100%",
        }}
      >
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={!isVisible}
          placeholderTextColor={colors.border}
          style={{
            fontFamily: "DMSans_600SemiBold",
            flex: 1,
            width: "100%",
            borderBottomWidth: 0,
            marginBottom: 0,
            fontSize: 18,
            borderWidth: 0,
            borderColor: colors.border,
            color: colors.text,
            paddingVertical: 5,
          }}
          {...otherProps}
        />
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={{ marginRight: 5 }}
        >
          <MaterialIcons
            name={isVisible ? "visibility-off" : "visibility"}
            size={22}
            color={colors.border}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }}>
        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
      </View>
    </View>
  );
}
