import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@react-navigation/native";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

interface ForgotPasswordProps {
  setIsForgotPasswordPressed: (input: boolean) => void;
}

export default function ForgotPassword({
  setIsForgotPasswordPressed,
}: ForgotPasswordProps) {
  const { colors } = useTheme();

  const instructionText =
    "Submit your email address to receive a message to update your password";

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

          <ThemedText style={{ marginTop: 10 }}>Email *</ThemedText>
          <TextInput
            style={{
              borderColor: colors.border,
              color: colors.text,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Enter your email"
            placeholderTextColor={colors.border}
            keyboardType="email-address"
          />
        </View>

        <ThemedView>
          <ThemedButton
            title="Submit"
            onPress={() => Alert.alert("Signed in!")}
            style={{ width: "100%", marginTop: 25 }}
          />
        </ThemedView>
        <TouchableOpacity onPress={() => setIsForgotPasswordPressed(false)}>
          <ThemedText style={{ marginTop: 25, textAlign: "center" }}>
            Return to Sign In
          </ThemedText>
        </TouchableOpacity>
      </ThemedScrollView>
    </ThemedView>
  );
}
