import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import ForgotPassword from "./forgot-password";
import SignUp from "./sign-up";

export default function SignIn() {
  const { colors } = useTheme();
  const [isSignUpPressed, setIsSignUpPressed] = useState(false);
  const [isForgotPasswordPressed, setIsForgotPasswordPressed] = useState(false);

  if (isSignUpPressed) {
    return <SignUp setIsSignUpPressed={setIsSignUpPressed} />;
  }

  if (isForgotPasswordPressed) {
    return (
      <ForgotPassword setIsForgotPasswordPressed={setIsForgotPasswordPressed} />
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">SIGN IN</ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView>
        <View style={{ marginBottom: 16 }}>
          <ThemedText style={{ marginBottom: 6 }}>Email *</ThemedText>
          <TextInput
            style={{
              borderColor: colors.border,
              color: colors.text,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            placeholder="Enter your email"
            placeholderTextColor={colors.border}
            keyboardType="email-address"
          />
        </View>

        <View style={{ marginBottom: 8 }}>
          <ThemedText style={{ marginBottom: 6 }}>Password *</ThemedText>
          <TextInput
            style={{
              borderColor: colors.border,
              color: colors.text,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            placeholderTextColor={colors.border}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <ThemedText style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>
          * indicates required field
        </ThemedText>

        <TouchableOpacity onPress={() => setIsForgotPasswordPressed(true)}>
          <ThemedText style={{ marginBottom: 16 }}>Forgot password?</ThemedText>
        </TouchableOpacity>

        <ThemedView style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ThemedButton
            title="Sign in"
            onPress={() => Alert.alert("Signed in!")}
            style={{ width: "100%" }}
          />
        </ThemedView>

        <TouchableOpacity onPress={() => setIsSignUpPressed(true)}>
          <ThemedText style={{ marginTop: 25, textAlign: "center" }}>
            Dont have an account? Sign up here
          </ThemedText>
        </TouchableOpacity>
      </ThemedScrollView>
    </ThemedView>
  );
}
