import { user } from "@/constants/temporary/user";
import useFormValidation from "@/hooks/useFormValidation";
import { personalInfoSchema } from "@/schemas/personal-info";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedTextInputMask } from "../themed-text-input-mask";

interface PersonalInfoModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

type PersonalInfoFields = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoModal({
  isVisible,
  closeModal,
}: PersonalInfoModalProps) {
  const { colors } = useTheme();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [birthDate, setBirthDate] = useState(
    format(user.birthDate, "MM/dd/yyyy") || ""
  );
  const [addressLineOne, setAddressLineOne] = useState(
    user.addressLineOne || ""
  );
  const [addressLineTwo, setAddressLineTwo] = useState(
    user.addressLineTwo || ""
  );
  const [city, setCity] = useState(user.city || "");
  const [postalCode, setPostalCode] = useState(user.postalCode || "");
  const [state, setState] = useState(user.state || "");
  const [country, setCountry] = useState(user.country || "");

  const { errors, validateForm, clearFieldError } =
    useFormValidation<PersonalInfoFields>();

  const originalValues = useMemo(
    () => ({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      birthDate: format(user.birthDate, "MM/dd/yyyy") || "",
      addressLineOne: user.addressLineOne || "",
      addressLineTwo: user.addressLineTwo || "",
      city: user.city || "",
      postalCode: user.postalCode || "",
      state: user.state || "",
      country: user.country || "",
    }),
    []
  );

  const hasChanges = useMemo(() => {
    return (
      firstName !== originalValues.firstName ||
      lastName !== originalValues.lastName ||
      birthDate !== originalValues.birthDate ||
      addressLineOne !== originalValues.addressLineOne ||
      addressLineTwo !== originalValues.addressLineTwo ||
      city !== originalValues.city ||
      postalCode !== originalValues.postalCode ||
      state !== originalValues.state ||
      country !== originalValues.country
    );
  }, [
    firstName,
    lastName,
    birthDate,
    addressLineOne,
    addressLineTwo,
    city,
    postalCode,
    state,
    country,
    originalValues,
  ]);

  const handlePersonalInfoEdit = (updatedUser: PersonalInfoFields) => {
    const validatedData = validateForm(personalInfoSchema, updatedUser);
    if (!validatedData) return;

    Alert.alert("Personal Info Edited!");
  };

  return (
    <ThemedModal
      isVisible={isVisible}
      onClose={closeModal}
      showSwipeIndicator={false}
      innerViewStyle={{ paddingHorizontal: 10, height: "80%" }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          marginRight: 30,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={closeModal}>
          <Ionicons name="close" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingBottom: 300,
        }}
      >
        <ThemedText
          type="subtitle"
          style={{ marginBottom: 20, textAlign: "center" }}
        >
          Personal Info
        </ThemedText>
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
          placeholder="Birth Date (MM/DD/YYYY)"
          keyboardType="numeric"
          value={birthDate}
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
        </View>

        <ThemedTextInput
          placeholder="Country"
          value={country}
          onChangeText={(text) => {
            setCountry(text);
            clearFieldError("country");
          }}
          error={errors.country}
        />
        <ThemedButton
          title="Save Changes"
          style={{ marginTop: 20 }}
          disabled={!hasChanges}
          onPress={() =>
            handlePersonalInfoEdit({
              firstName,
              lastName,
              birthDate,
              addressLineOne,
              addressLineTwo,
              city,
              postalCode,
              state,
              country,
            })
          }
        />
      </ScrollView>
    </ThemedModal>
  );
}
