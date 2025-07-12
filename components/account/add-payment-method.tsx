import { NewCardDetails } from "@/types/user";
import React, { useState } from "react";
import { Switch, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedSecureTextInput } from "../themed-secure-text-input";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

interface AddPaymentMethodFormProps {
  onAdd: (newCardDetails: NewCardDetails) => void;
}

export default function AddPaymentMethodForm({
  onAdd,
}: AddPaymentMethodFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [name, setName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  return (
    // margin gives user room to select buttons when keyboard is open
    <View style={{ marginBottom: 300 }}>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 20, textAlign: "center" }}
      >
        Add Payment Method
      </ThemedText>

      <ThemedSecureTextInput
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <ThemedSecureTextInput
        placeholder="Security Code"
        keyboardType="numeric"
        value={securityCode}
        onChangeText={setSecurityCode}
      />

      <ThemedTextInput
        placeholder="Cardholder Name"
        value={name}
        onChangeText={setName}
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <ThemedTextInput
          placeholder="MM"
          value={expMonth}
          onChangeText={setExpMonth}
          keyboardType="numeric"
          style={{ flex: 1, padding: 10 }}
        />

        <ThemedTextInput
          placeholder="YYYY"
          value={expYear}
          onChangeText={setExpYear}
          keyboardType="numeric"
          style={{ flex: 2, padding: 10 }}
        />
      </View>

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

      <ThemedTextInput
        placeholder="State"
        value={state}
        onChangeText={setState}
      />

      <ThemedTextInput
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />

      <ThemedTextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />

      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <ThemedText>Set as Default?</ThemedText>
        <Switch onValueChange={setIsDefault} value={isDefault} />
      </ThemedView>

      <ThemedButton
        title="Add Card"
        style={{ marginTop: 20 }}
        onPress={() =>
          onAdd({
            cardNumber,
            securityCode,
            name,
            expMonth,
            expYear,
            addressLineOne,
            addressLineTwo,
            state,
            postalCode,
            country,
            isDefault,
          })
        }
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      ></View>
    </View>
  );
}
