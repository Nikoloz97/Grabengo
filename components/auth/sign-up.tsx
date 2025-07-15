import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import useFormValidation from "@/hooks/useFormValidation";
import { signUpSchema } from "@/schemas/signup";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { ThemedSecureTextInput } from "../themed-secure-text-input";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedTextInputMask } from "../themed-text-input-mask";

interface SignUpProps {
  setIsSignUpPressed: (input: boolean) => void;
}

type SignUpFields = z.infer<typeof signUpSchema>;

export default function SignUp({ setIsSignUpPressed }: SignUpProps) {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const { errors, validateForm, clearFieldError } =
    useFormValidation<SignUpFields>();

  const handleSignup = () => {
    const validatedData = validateForm(signUpSchema, {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      birthDate,
      addressLineOne,
      addressLineTwo,
      city,
      postalCode,
      state,
      country,
    });
    if (!validatedData) return;

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
          onChangeText={(text) => {
            setEmail(text);
            clearFieldError("email");
          }}
          error={errors.email}
          style={{ marginTop: 20 }}
        />
        <ThemedSecureTextInput
          placeholder="*Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            clearFieldError("password");
          }}
          error={errors.password}
        />
        <ThemedSecureTextInput
          placeholder="*Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            clearFieldError("confirmPassword");
          }}
          error={errors.confirmPassword}
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemedTextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              clearFieldError("firstName");
            }}
            error={errors.firstName}
            style={{ flex: 1 }}
          />
          <ThemedTextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              clearFieldError("lastName");
            }}
            error={errors.lastName}
            style={{ flex: 1 }}
          />
        </View>
        <ThemedTextInputMask
          type="datetime"
          options={{
            format: "MM/DD/YYYY",
          }}
          keyboardType="numeric"
          value={birthDate}
          placeholder="Birth Date (MM/DD/YYYY)"
          onChangeText={(text) => {
            setBirthDate(text);
            clearFieldError("birthDate");
          }}
          error={errors.birthDate}
        />
        <ThemedTextInput
          placeholder="Address Line 1"
          value={addressLineOne}
          onChangeText={(text) => {
            setAddressLineOne(text);
            clearFieldError("addressLineOne");
          }}
          error={errors.addressLineOne}
        />
        <ThemedTextInput
          placeholder="Address Line 2"
          value={addressLineTwo}
          onChangeText={(text) => {
            setAddressLineTwo(text);
            clearFieldError("addressLineTwo");
          }}
          error={errors.addressLineTwo}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemedTextInput
            placeholder="City"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              clearFieldError("city");
            }}
            style={{ flex: 1 }}
          />
          {/* TODO: dropdown options */}
          <ThemedTextInput
            placeholder="State"
            value={state}
            onChangeText={(text) => {
              setState(text);
              clearFieldError("state");
            }}
            error={errors.state}
            style={{ flex: 1 }}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemedTextInput
            placeholder="Zipcode"
            value={postalCode}
            onChangeText={(text) => {
              setPostalCode(text);
              clearFieldError("postalCode");
            }}
            error={errors.postalCode}
            style={{ flex: 1 }}
          />
          <ThemedTextInput
            placeholder="Country"
            value={country}
            onChangeText={(text) => {
              setCountry(text);
              clearFieldError("country");
            }}
            error={errors.country}
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
