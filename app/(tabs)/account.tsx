import SignIn from "@/components/auth/sign-in";
import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@react-navigation/native";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

export default function Account() {
  const { colors } = useTheme();
  const { user } = useAuth();

  if (user === null || user.isAnonymous) {
    return <SignIn />;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">ACCOUNT</ThemedText>
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
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <ThemedText style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>
          * indicates required field
        </ThemedText>

        <TouchableOpacity onPress={() => Alert.alert("Reset password")}>
          <ThemedText style={{ marginBottom: 16 }}>Forgot password?</ThemedText>
        </TouchableOpacity>

        <ThemedView style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ThemedButton
            title="Sign in"
            onPress={() => Alert.alert("Signed in!")}
            style={{ width: "100%" }}
          />
        </ThemedView>

        <TouchableOpacity onPress={() => Alert.alert("Navigate to sign up")}>
          <ThemedText style={{ marginTop: 32, textAlign: "center" }}>
            Dont have an account? Sign up here
          </ThemedText>
        </TouchableOpacity>
      </ThemedScrollView>
    </ThemedView>
  );
}
