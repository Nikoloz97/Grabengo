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
import ForgotPassword from "./forgot-password";
import SignUp from "./sign-up";

export default function SignIn() {
  const { colors } = useTheme();
  const [isSignUpPressed, setIsSignUpPressed] = useState(false);
  const [isForgotPasswordPressed, setIsForgotPasswordPressed] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        <ThemedTextInput placeholder="Email" keyboardType="email-address" />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: colors.border,
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

        <TouchableOpacity onPress={() => setIsForgotPasswordPressed(true)}>
          <ThemedText style={{ marginTop: 20 }}>Forgot password?</ThemedText>
        </TouchableOpacity>

        <ThemedButton
          title="Sign in"
          onPress={() => Alert.alert("Signed in!")}
          style={{ marginTop: 20 }}
        />

        <TouchableOpacity onPress={() => setIsSignUpPressed(true)}>
          <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
            Dont have an account? Sign up here
          </ThemedText>
        </TouchableOpacity>
      </ThemedScrollView>
    </ThemedView>
  );
}
