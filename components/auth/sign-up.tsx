import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { ThemedTextInput } from "../themed-text-input";

interface SignUpProps {
  setIsSignUpPressed: (input: boolean) => void;
}

export default function SignUp({ setIsSignUpPressed }: SignUpProps) {
  const { colors } = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">SIGN UP</ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView>
        <ThemedTextInput placeholder="First name" />
        <ThemedTextInput placeholder="Last name" />
        <ThemedTextInput placeholder="Email" keyboardType="email-address" />

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
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            style={{ flex: 1, borderBottomWidth: 0, marginBottom: 0 }}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <MaterialIcons
              name={isPasswordVisible ? "visibility-off" : "visibility"}
              size={22}
              color={colors.border}
            />
          </TouchableOpacity>
        </View>

        <ThemedButton
          title="Sign up"
          onPress={() => Alert.alert("Signed up!")}
          style={{ marginTop: 20 }}
        />

        <TouchableOpacity onPress={() => setIsSignUpPressed(false)}>
          <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
            Already have an account? Sign in here
          </ThemedText>
        </TouchableOpacity>
      </ThemedScrollView>
    </ThemedView>
  );
}
