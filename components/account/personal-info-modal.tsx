import { db } from "@/firebase/config";
import { errorToast, successToast } from "@/hooks/default-toasts";
import { formatPhoneNumber, stringToDate } from "@/hooks/formatters";
import useFormValidation from "@/hooks/useFormValidation";
import { personalInfoSchema } from "@/schemas/personal-info";
import { UserType } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import { deleteField, doc, Timestamp, updateDoc } from "firebase/firestore";
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
  closeModalAndRefetch: () => void;
  // TODO: rename userType variable to something else (sounds confusing)
  userType: UserType;
  userId: string;
}

type PersonalInfoFields = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoModal({
  isVisible,
  closeModal,
  closeModalAndRefetch,
  userType,
  userId,
}: PersonalInfoModalProps) {
  const { colors } = useTheme();

  const [name, setName] = useState<string>(userType.name || "");
  const [phone, setPhone] = useState<string | undefined>(
    userType.phone && formatPhoneNumber(userType.phone)
  );
  const [birthDate, setBirthDate] = useState<string | undefined>(
    userType.birthDate && format(userType.birthDate.toDate(), "MM/dd/yyyy")
  );
  const [addressLineOne, setAddressLineOne] = useState<string | undefined>(
    userType.addressLineOne
  );
  const [addressLineTwo, setAddressLineTwo] = useState<string | undefined>(
    userType.addressLineTwo
  );
  const [city, setCity] = useState<string | undefined>(userType.city);
  const [postalCode, setPostalCode] = useState<string | undefined>(
    userType.postalCode
  );
  const [state, setState] = useState<string | undefined>(userType.state);
  const [country, setCountry] = useState<string | undefined>(userType.country);

  const [isLoading, setIsLoading] = useState(false);

  const { errors, validateForm, clearFieldError } =
    useFormValidation<PersonalInfoFields>();

  const originalValues = useMemo(
    () => ({
      name: userType.name,
      phone: userType.phone && formatPhoneNumber(userType.phone),
      birthDate:
        userType.birthDate && format(userType.birthDate.toDate(), "MM/dd/yyyy"),
      addressLineOne: userType.addressLineOne,
      addressLineTwo: userType.addressLineTwo,
      city: userType.city,
      postalCode: userType.postalCode,
      state: userType.state,
      country: userType.country,
    }),
    [userType]
  );

  // Reset form fields when modal reopens
  useEffect(() => {
    if (isVisible) {
      setName(originalValues.name);
      setPhone(originalValues.phone);
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
      name !== originalValues.name ||
      phone !== originalValues.phone ||
      birthDate !== originalValues.birthDate ||
      addressLineOne !== originalValues.addressLineOne ||
      addressLineTwo !== originalValues.addressLineTwo ||
      city !== originalValues.city ||
      postalCode !== originalValues.postalCode ||
      state !== originalValues.state ||
      country !== originalValues.country
    );
  }, [
    name,
    phone,
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
    const validatedData = validateForm(
      personalInfoSchema,
      updatedUser,
      setIsLoading
    );
    if (!validatedData) {
      return;
    }

    try {
      let dataToUpdate = {
        name: validatedData.name,
        phone: validatedData.phone
          ? formatPhoneNumber(validatedData.phone)
          : deleteField(),
        birthDate: validatedData.birthDate
          ? Timestamp.fromDate(stringToDate(validatedData.birthDate))
          : deleteField(),
        addressLineOne: validatedData.addressLineOne ?? deleteField(),
        addressLineTwo: validatedData.addressLineTwo ?? deleteField(),
        city: validatedData.city ?? deleteField(),
        postalCode: validatedData.postalCode ?? deleteField(),
        state: validatedData.state ?? deleteField(),
        country: validatedData.country ?? deleteField(),
      };
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, dataToUpdate);
      successToast("Personal info updated!");
    } catch (error) {
      errorToast(error);
    } finally {
      closeModalAndRefetch();
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
        <ThemedTextInput
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            clearFieldError("name");
          }}
          error={errors.name}
          style={{ flex: 1 }}
        />
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
        />
      </ScrollView>
    </ThemedModal>
  );
}
