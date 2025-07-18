import { errorToast, successToast } from "@/hooks/default-toasts";
import useFormValidation from "@/hooks/useFormValidation";
import { addPaymentMethodSchema } from "@/schemas/add-payment-method";
import React, { useState } from "react";
import { Switch, View } from "react-native";
import { z } from "zod";
import { ThemedButton } from "../themed-button";
import { ThemedSecureTextInput } from "../themed-secure-text-input";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

interface AddPaymentMethodFormProps {
  closeModal: () => void;
}

type AddPaymentMethodFields = z.infer<typeof addPaymentMethodSchema>;

export default function AddPaymentMethodForm({
  closeModal,
}: AddPaymentMethodFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [name, setName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const { errors, validateForm, clearFieldError } =
    useFormValidation<AddPaymentMethodFields>();

  const addPaymentMethod = (input: AddPaymentMethodFields) => {
    const validatedData = validateForm(addPaymentMethodSchema, input);
    if (!validatedData) return;

    try {
      successToast("Payment Method Added!");
    } catch (error) {
      errorToast(error, "Failed to process payment method");
    } finally {
      closeModal();
    }
  };

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
        onChangeText={(text) => {
          setCardNumber(text);
          clearFieldError("cardNumber");
        }}
        error={errors.cardNumber}
      />

      <ThemedSecureTextInput
        placeholder="Security Code"
        keyboardType="numeric"
        value={securityCode}
        onChangeText={(text) => {
          setSecurityCode(text);
          clearFieldError("securityCode");
        }}
        error={errors.securityCode}
      />

      <ThemedTextInput
        placeholder="Cardholder Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          clearFieldError("name");
        }}
        error={errors.name}
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <ThemedTextInput
          placeholder="MM"
          keyboardType="numeric"
          value={expMonth}
          onChangeText={(text) => {
            setExpMonth(text);
            clearFieldError("expMonth");
          }}
          error={errors.expMonth}
          style={{ flex: 1, padding: 10 }}
        />

        <ThemedTextInput
          placeholder="YYYY"
          value={expYear}
          keyboardType="numeric"
          onChangeText={(text) => {
            setExpYear(text);
            clearFieldError("expYear");
          }}
          error={errors.expYear}
          style={{ flex: 2, padding: 10 }}
        />
      </View>

      <ThemedTextInput
        keyboardType="numeric"
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={(text) => {
          setPostalCode(text);
          clearFieldError("postalCode");
        }}
        error={errors.postalCode}
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
          addPaymentMethod({
            cardNumber,
            securityCode,
            name,
            expMonth,
            expYear,
            postalCode,
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
