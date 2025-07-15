import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInFields, string>>
  >({});

  const handleSignIn = () => {
    const result = signInSchema.safeParse({ email });

    // TODO: Make this reusable??
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignInFields, string>> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SignInFields;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
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
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
        />

        <ThemedSecureTextInput
          placeholder="*Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
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
