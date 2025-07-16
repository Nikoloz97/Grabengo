import { capitalizeWord } from "@/hooks/formatters";
import useFormValidation from "@/hooks/useFormValidation";
import { editPaymentMethodSchema } from "@/schemas/edit-payment-method";
import { PaymentMethod } from "@/types/user";
import React, { useMemo, useState } from "react";
import { Switch, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { ThemedButton } from "../themed-button";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

interface EditPaymentMethodFormProps {
  selectedPaymentMethod: PaymentMethod;
  closeModal: () => void;
}

type EditPaymentMethodFields = z.infer<typeof editPaymentMethodSchema>;

export default function EditPaymentMethodForm({
  selectedPaymentMethod,
  closeModal,
}: EditPaymentMethodFormProps) {
  const [name, setName] = useState(
    selectedPaymentMethod.billing_details.name || ""
  );
  const [expMonth, setExpMonth] = useState(
    String(selectedPaymentMethod.card.exp_month)
  );
  const [expYear, setExpYear] = useState(
    String(selectedPaymentMethod.card.exp_year)
  );
  const [postalCode, setPostalCode] = useState(
    selectedPaymentMethod.billing_details.address.postal_code || ""
  );
  const [isDefault, setIsDefault] = useState(
    selectedPaymentMethod.isDefault || false
  );

  const { errors, validateForm, clearFieldError } =
    useFormValidation<EditPaymentMethodFields>();

  const originalValues = useMemo(
    () => ({
      name: selectedPaymentMethod.billing_details.name || "",
      expMonth: String(selectedPaymentMethod.card.exp_month),
      expYear: String(selectedPaymentMethod.card.exp_year),
      postalCode:
        selectedPaymentMethod.billing_details.address.postal_code || "",
      isDefault: selectedPaymentMethod.isDefault || false,
    }),
    [selectedPaymentMethod]
  );

  const hasChanges = useMemo(() => {
    return (
      name !== originalValues.name ||
      expMonth !== originalValues.expMonth ||
      expYear !== originalValues.expYear ||
      postalCode !== originalValues.postalCode ||
      isDefault !== originalValues.isDefault
    );
  }, [name, expMonth, expYear, postalCode, isDefault, originalValues]);

  const handleEditPaymentMethod = (
    paymentMethodInput: EditPaymentMethodFields
  ) => {
    const validatedData = validateForm(
      editPaymentMethodSchema,
      paymentMethodInput
    );
    if (!validatedData) return;

    try {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Payment Method Edited!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to process. Please try again.",
      });
    } finally {
      closeModal();
    }
  };

  const handleDeletePaymentMethod = (paymentMethodId: string) => {
    try {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Payment Method Removed!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to process. Please try again.",
      });
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
        Edit Payment Method
      </ThemedText>

      <ThemedText
        type="faint"
        style={{ fontSize: 25, fontWeight: "600", marginBottom: 20 }}
      >
        {capitalizeWord(selectedPaymentMethod.card.brand)} ••••
        {selectedPaymentMethod.card.last4}
      </ThemedText>

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
          value={expMonth}
          keyboardType="numeric"
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

      {/* remove ability to remove a default payment */}
      {!isDefault && (
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
      )}

      <ThemedButton
        title="Save Changes"
        style={{ marginTop: 20 }}
        disabled={!hasChanges}
        onPress={() =>
          handleEditPaymentMethod({
            name,
            expMonth,
            expYear,
            postalCode,
            isDefault,
          })
        }
      />

      <ThemedButton
        title="Remove Card"
        type="danger"
        onPress={() => handleDeletePaymentMethod(selectedPaymentMethod.id)}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
