import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { auth, db } from "@/firebase/config";
import { errorToast, successToast } from "@/hooks/default-toasts";
import { formatPhoneNumber, stringToDate } from "@/hooks/formatters";
import useFormValidation from "@/hooks/useFormValidation";
import { signUpSchema } from "@/schemas/signup";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
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

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [birthDate, setBirthDate] = useState<string | undefined>();
  const [addressLineOne, setAddressLineOne] = useState<string | undefined>();
  const [addressLineTwo, setAddressLineTwo] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [postalCode, setPostalCode] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();
  const [country, setCountry] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState(false);

  const { errors, validateForm, clearFieldError } =
    useFormValidation<SignUpFields>();

  const handleSignup = async (userData: SignUpFields) => {
    setIsLoading(true);
    const validatedData = validateForm(signUpSchema, userData, setIsLoading);
    if (!validatedData) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: userData.name,
        ...(userData.phone && { phone: formatPhoneNumber(userData.phone) }),
        ...(userData.birthDate && {
          birthDate: stringToDate(userData.birthDate),
        }),
        ...(userData.addressLineOne && {
          addressLineOne: userData.addressLineOne,
        }),
        ...(userData.addressLineTwo && {
          addressLineOne: userData.addressLineTwo,
        }),
        ...(userData.city && { addressLineOne: userData.city }),
        ...(userData.postalCode && { addressLineOne: userData.postalCode }),
        ...(userData.state && { addressLineOne: userData.state }),
        ...(userData.country && { addressLineOne: userData.country }),
      });
      router.push("/");
      successToast("Signed up!");
      setIsSignUpPressed(false);
    } catch (error) {
      errorToast(error);
      console.log(error);
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete(); // clean up Firebase Auth
        } catch (deleteError) {
          console.error(
            "Rollback failed: couldn't delete auth user",
            deleteError
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
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
            placeholder="*Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              clearFieldError("name");
            }}
            error={errors.name}
            style={{ flex: 1 }}
          />
        </View>
        <ThemedTextInput
          placeholder="Phone"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            const formatted = formatPhoneNumber(text);
            setPhone(formatted);
            clearFieldError("phone");
          }}
          error={errors.phone}
          style={{ flex: 1 }}
        />
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
            error={errors.city}
            style={{ flex: 1 }}
          />
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
          isLoading={isLoading}
          onPress={() =>
            handleSignup({
              email,
              password,
              confirmPassword,
              name,
              phone,
              birthDate,
              addressLineOne,
              addressLineTwo,
              city,
              postalCode,
              state,
              country,
            })
          }
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
