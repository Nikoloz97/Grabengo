import { capitalizeWord } from "@/hooks/formatters";
import { PaymentMethod } from "@/types/user";
import React, { useState } from "react";
import { Switch, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

interface EditPaymentMethodFormProps {
  paymentMethod: PaymentMethod;
  onSave: (updates: any) => void;
  onRemove: () => void;
}

export default function EditPaymentMethodForm({
  paymentMethod,
  onSave,
  onRemove,
}: EditPaymentMethodFormProps) {
  const [name, setName] = useState(paymentMethod.billing_details.name || "");
  const [expMonth, setExpMonth] = useState(
    String(paymentMethod.card.exp_month)
  );
  const [expYear, setExpYear] = useState(String(paymentMethod.card.exp_year));
  const [addressLineOne, setAddressLineOne] = useState(
    paymentMethod.billing_details.address?.line1 || ""
  );
  const [addressLineTwo, setAddressLineTwo] = useState(
    paymentMethod.billing_details.address?.line2 || ""
  );
  const [state, setState] = useState(
    paymentMethod.billing_details.address.state || ""
  );
  const [postalCode, setPostalCode] = useState(
    paymentMethod.billing_details.address.postal_code || ""
  );
  const [isDefault, setIsDefault] = useState(paymentMethod.isDefault || false);

  return (
    // margin gives user room to select buttons when keyboard is open
    <View style={{ marginBottom: 300 }}>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 20, textAlign: "center" }}
      >
        Edit Payment Method
      </ThemedText>

      <ThemedText
        type="faint"
        style={{ fontSize: 25, fontWeight: "600", marginBottom: 20 }}
      >
        {capitalizeWord(paymentMethod.card.brand)} ••••
        {paymentMethod.card.last4}
      </ThemedText>

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
        title="Save Changes"
        style={{ marginTop: 20 }}
        onPress={() =>
          onSave({
            name,
            expMonth,
            expYear,
            addressLineOne,
            addressLineTwo,
            isDefault,
          })
        }
      />

      <ThemedButton
        title="Remove Card"
        type="danger"
        onPress={onRemove}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
