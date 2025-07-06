import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ThemedTextInput } from "../themed-text-input";

interface SignUpProps {
  setIsSignUpPressed: (input: boolean) => void;
}

export default function SignUp({ setIsSignUpPressed }: SignUpProps) {
  const { colors } = useTheme();

  const [date, setDate] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">SIGN UP</ThemedText>
      </ThemedHeaderView>

      {/* paddingBottom = enough space to see sign up bottom with keyboard */}
      <ThemedScrollView contentContainerStyle={{ paddingBottom: 350 }}>
        <ThemedTextInput placeholder="*First name" />
        <ThemedTextInput placeholder="*Last name" />
        <ThemedTextInput placeholder="*Email" keyboardType="email-address" />
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
            placeholder="*Password"
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
        <TextInputMask
          type="datetime"
          options={{
            format: "MM/DD/YY",
          }}
          value={date}
          onChangeText={(text) => setDate(text)}
          placeholder="Birth Date (MM/DD/YY)"
          placeholderTextColor={colors.border}
          style={{
            fontSize: 18,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: colors.border,
            color: colors.text,
            paddingVertical: 5,
            marginBottom: 16,
            marginTop: 30,
          }}
        />
        <ThemedTextInput placeholder="Address Line 1" />
        <ThemedTextInput placeholder="Address Line 2" />
        <ThemedTextInput placeholder="Town or City" />
        <ThemedTextInput placeholder="Zip Code" keyboardType="numeric" />
        <ThemedTextInput placeholder="State (e.g. OH)" />

        <ThemedText style={{ fontSize: 12, color: colors.border }}>
          * indicates required field
        </ThemedText>
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
