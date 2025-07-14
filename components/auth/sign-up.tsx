import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ThemedSecureTextInput } from "../themed-secure-text-input";
import { ThemedTextInput } from "../themed-text-input";

interface SignUpProps {
  setIsSignUpPressed: (input: boolean) => void;
}

export default function SignUp({ setIsSignUpPressed }: SignUpProps) {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // TODO: maybe change this to individual month, day, and year states
  const [birthDate, setBirthDate] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleSignup = () => {
    Alert.alert("Signed up!");
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">SIGN UP</ThemedText>
      </ThemedHeaderView>

      {/* paddingBottom = enough space to see sign up bottom with keyboard */}
      <ThemedScrollView contentContainerStyle={{ paddingBottom: 350 }}>
        <ThemedText style={{ color: colors.border }}>
          * indicates required field
        </ThemedText>
        <ThemedTextInput
          placeholder="*Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{ marginTop: 20 }}
        />
        <ThemedSecureTextInput
          placeholder="*Password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemedTextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={{ flex: 1 }}
          />
          <ThemedTextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={{ flex: 1 }}
          />
        </View>
        <TextInputMask
          type="datetime"
          options={{
            format: "MM/DD/YY",
          }}
          value={birthDate}
          onChangeText={(text) => setBirthDate(text)}
          placeholder="Birth Date (MM/DD/YY)"
          placeholderTextColor={colors.border}
          style={{
            fontFamily: "DMSans_600SemiBold",

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
        <ThemedTextInput
          placeholder="Address Line 1"
          value={addressLineOne}
          onChangeText={setAddressLineOne}
        />
        <ThemedTextInput
          placeholder="Address Line 2"
          value={addressLineTwo}
          onChangeText={setAddressLineTwo}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemedTextInput
            placeholder="City"
            value={city}
            onChangeText={setCity}
            style={{ flex: 1 }}
          />
          {/* TODO: dropdown options */}
          <ThemedTextInput
            placeholder="State"
            value={state}
            onChangeText={setState}
            style={{ flex: 1 }}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemedTextInput
            placeholder="Zipcode"
            value={postalCode}
            onChangeText={setPostalCode}
            style={{ flex: 1 }}
          />
          <ThemedTextInput
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            style={{ flex: 1 }}
          />
        </View>

        <ThemedButton
          title="Sign up"
          onPress={handleSignup}
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
