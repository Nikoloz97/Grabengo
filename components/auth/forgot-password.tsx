import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Alert, TouchableOpacity, View } from "react-native";
import { ThemedTextInput } from "../themed-text-input";

interface ForgotPasswordProps {
  setIsForgotPasswordPressed: (input: boolean) => void;
}

export default function ForgotPassword({
  setIsForgotPasswordPressed,
}: ForgotPasswordProps) {
  const instructionText =
    "Submit your email address below to receive instructions on how to update your password";

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">FORGOT PASSWORD</ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView>
        <View>
          <ThemedText style={{ textAlign: "center" }}>
            {instructionText}
          </ThemedText>

          <ThemedTextInput
            style={{ marginTop: 20 }}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>

        <ThemedButton
          title="Submit"
          onPress={() => Alert.alert("Signed in!")}
          style={{ marginTop: 10 }}
        />
        <TouchableOpacity onPress={() => setIsForgotPasswordPressed(false)}>
          <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
            Return to Sign In
          </ThemedText>
        </TouchableOpacity>
      </ThemedScrollView>
    </ThemedView>
  );
}
