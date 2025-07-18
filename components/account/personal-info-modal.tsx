import { db } from "@/firebase/config";
import { errorToast, successToast } from "@/hooks/default-toasts";
import { stringToDate } from "@/hooks/formatters";
import useFormValidation from "@/hooks/useFormValidation";
import { personalInfoSchema } from "@/schemas/personal-info";
import { UserType } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedTextInputMask } from "../themed-text-input-mask";

interface PersonalInfoModalProps {
  isVisible: boolean;
  closeModal: () => void;
  // TODO: rename userType variable to something else (sounds confusing)
  userType: UserType;
  userId: string;
}

type PersonalInfoFields = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoModal({
  isVisible,
  closeModal,
  userType,
  userId,
}: PersonalInfoModalProps) {
  const { colors } = useTheme();

  const [firstName, setFirstName] = useState(userType.firstName || "");
  const [lastName, setLastName] = useState(userType.lastName || "");
  const [birthDate, setBirthDate] = useState(
    (userType.birthDate && format(userType.birthDate.toDate(), "MM/dd/yyyy")) ||
      ""
  );
  const [addressLineOne, setAddressLineOne] = useState(
    userType.addressLineOne || ""
  );
  const [addressLineTwo, setAddressLineTwo] = useState(
    userType.addressLineTwo || ""
  );
  const [city, setCity] = useState(userType.city || "");
  const [postalCode, setPostalCode] = useState(userType.postalCode || "");
  const [state, setState] = useState(userType.state || "");
  const [country, setCountry] = useState(userType.country || "");

  const [isLoading, setIsLoading] = useState(false);

  const { errors, validateForm, clearFieldError } =
    useFormValidation<PersonalInfoFields>();

  const originalValues = useMemo(
    () => ({
      firstName: userType.firstName || "",
      lastName: userType.lastName || "",
      birthDate:
        (userType.birthDate &&
          format(userType.birthDate.toDate(), "MM/dd/yyyy")) ||
        "",
      addressLineOne: userType.addressLineOne || "",
      addressLineTwo: userType.addressLineTwo || "",
      city: userType.city || "",
      postalCode: userType.postalCode || "",
      state: userType.state || "",
      country: userType.country || "",
    }),
    []
  );

  // Reset form fields when modal opens
  useEffect(() => {
    if (isVisible) {
      setFirstName(originalValues.firstName);
      setLastName(originalValues.lastName);
      setBirthDate(originalValues.birthDate);
      setAddressLineOne(originalValues.addressLineOne);
      setAddressLineTwo(originalValues.addressLineTwo);
      setCity(originalValues.city);
      setPostalCode(originalValues.postalCode);
      setState(originalValues.state);
      setCountry(originalValues.country);
    }
  }, [isVisible, originalValues]);

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

  const handlePersonalInfoEdit = async (updatedUser: PersonalInfoFields) => {
    setIsLoading(true);
    const validatedData = validateForm(personalInfoSchema, updatedUser);
    if (!validatedData) {
      errorToast(null, "Please address invalid form input");
      setIsLoading(false);
      return;
    }
    try {
      // no spread operator due to birthDate field
      let dataToUpdate = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        birthDate:
          validatedData.birthDate &&
          Timestamp.fromDate(stringToDate(validatedData.birthDate)),
        addressLineOne: validatedData.addressLineOne,
        addressLineTwo: validatedData.addressLineTwo,
        city: validatedData.city,
        postalCode: validatedData.postalCode,
        state: validatedData.state,
        country: validatedData.country,
      };

      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, dataToUpdate);
      successToast("Personal info updated!");
    } catch (error) {
      errorToast(error);
    } finally {
      closeModal();
      setIsLoading(false);
    }
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
          isLoading={isLoading}
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
