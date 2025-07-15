import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import useFormValidation from "@/hooks/useFormValidation";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { z } from "zod";
import { ThemedSecureTextInput } from "../themed-secure-text-input";
import { ThemedTextInput } from "../themed-text-input";
import ForgotPassword from "./forgot-password";
import SignUp from "./sign-up";

const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

type SignInFields = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isSignUpPressed, setIsSignUpPressed] = useState(false);
  const [isForgotPasswordPressed, setIsForgotPasswordPressed] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, validateForm, clearFieldError } =
    useFormValidation<SignInFields>();

  const handleSignIn = () => {
    const validatedData = validateForm(signInSchema, { email });

    if (!validatedData) return;

    Alert.alert("Signed in!");
  };

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
        <ThemedTextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            clearFieldError("email");
          }}
          error={errors.email}
        />

        <ThemedSecureTextInput
          placeholder="*Password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setIsForgotPasswordPressed(true)}>
          <ThemedText style={{ marginTop: 20 }}>Forgot password?</ThemedText>
        </TouchableOpacity>

        <ThemedButton
          title="Sign in"
          onPress={handleSignIn}
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
