import { capitalizeWord } from "@/hooks/formatters";
import { PaymentMethod } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedText } from "../themed-text";

interface EditPaymentMethodFormProps {
  paymentMethod: PaymentMethod;
  onBack: () => void;
  onSave: (updates: any) => void;
  onRemove: () => void;
  onSetDefault: () => void;
}

export function EditPaymentMethodForm({
  paymentMethod,
  onBack,
  onSave,
  onRemove,
  onSetDefault,
}: EditPaymentMethodFormProps) {
  const { colors } = useTheme();

  const [name, setName] = useState(paymentMethod.billing_details.name || "");
  const [expMonth, setExpMonth] = useState(
    String(paymentMethod.card.exp_month)
  );
  const [expYear, setExpYear] = useState(String(paymentMethod.card.exp_year));
  const [address, setAddress] = useState(
    paymentMethod.billing_details.address?.line1 || ""
  );

  return (
    // margin gives user room to select buttons when keyboard is open
    <View style={{ marginBottom: 300 }}>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 20, textAlign: "center" }}
      >
        Edit Payment Method
      </ThemedText>
      <TouchableOpacity onPress={onBack} style={{ marginBottom: 20 }}>
        <Ionicons name="arrow-back" size={20} color={colors.primary} />
      </TouchableOpacity>

      <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
        {capitalizeWord(paymentMethod.card.brand)} ••••
        {paymentMethod.card.last4}
      </ThemedText>

      {/* Cardholder Name */}
      <TextInput
        placeholder="Cardholder Name"
        placeholderTextColor={colors.border}
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          color: colors.text,
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
        }}
      />

      {/* Expiration Date */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
        <TextInput
          placeholder="MM"
          placeholderTextColor={colors.border}
          value={expMonth}
          onChangeText={setExpMonth}
          keyboardType="numeric"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
            borderRadius: 8,
            padding: 10,
          }}
        />
        <TextInput
          placeholder="YYYY"
          placeholderTextColor={colors.border}
          value={expYear}
          onChangeText={setExpYear}
          keyboardType="numeric"
          style={{
            flex: 2,
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
            borderRadius: 8,
            padding: 10,
          }}
        />
      </View>

      {/* Billing Address */}
      <TextInput
        placeholder="Billing Address"
        placeholderTextColor={colors.border}
        value={address}
        onChangeText={setAddress}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          color: colors.text,
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <ThemedButton
        title="Save Changes"
        type="primary"
        onPress={() =>
          onSave({
            name,
            expMonth,
            expYear,
            address,
          })
        }
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <ThemedButton
          title="Set as Default"
          type="primary"
          onPress={onSetDefault}
        />

        <ThemedButton title="Remove Card" type="primary" onPress={onRemove} />
      </View>
    </View>
  );
}
