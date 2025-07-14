import { user } from "@/constants/temporary/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";

interface PersonalInfoModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function PersonalInfoModal({
  isVisible,
  closeModal,
}: PersonalInfoModalProps) {
  const { colors } = useTheme();

  const editPersonalInfo = (updatedUser: any) => {
    Alert.alert("Personal Info Edited!");
  };

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  // TODO: maybe change this to individual month, day, and year states
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
        <ThemedTextInput
          placeholder="Birth Date"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <ThemedTextInput
          placeholder="Address Line 1"
          value={addressLineOne}
          onChangeText={setAddressLineOne}
        />
        <ThemedTextInput
          placeholder="Address Line 2 (Optional)"
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
          <ThemedTextInput
            placeholder="State"
            value={state}
            onChangeText={setState}
            style={{ flex: 1 }}
          />
          <ThemedTextInput
            placeholder="Zipcode"
            value={postalCode}
            onChangeText={setPostalCode}
            style={{ flex: 1 }}
          />
        </View>

        <ThemedTextInput
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <ThemedButton
          title="Save Changes"
          style={{ marginTop: 20 }}
          onPress={() =>
            editPersonalInfo({
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
