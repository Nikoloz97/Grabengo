import { functions } from "@/firebase/config";
import { errorToast, successToast } from "@/hooks/default-toasts";
import { capitalizeWord } from "@/hooks/formatters";
import { PaymentMethod } from "@/types/user";
import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";

interface PaymentMethodDetailsProps {
  selectedPaymentMethod: PaymentMethod;
  closeModalAndRefetch: () => void;
  resetModal: () => void;
}

export default function PaymentMethodDetails({
  selectedPaymentMethod,
  closeModalAndRefetch,
  resetModal,
}: PaymentMethodDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePaymentMethod = (paymentMethodId: string) => {
    Alert.alert("Delete payment method?", "This action cannot be undone", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
      },
      {
        text: "Confirm",
        onPress: async () => {
          try {
            setIsLoading(true);

            const deletePaymentMethod = httpsCallable(
              functions,
              "deletePaymentMethod"
            );

            await deletePaymentMethod({ paymentMethodId });
            successToast("Payment Method Removed!");
          } catch (error) {
            errorToast(
              error,
              "Failed to delete payment method. Please try again later."
            );
          } finally {
            setIsLoading(false);
            closeModalAndRefetch();
            resetModal();
          }
        },
      },
    ]);
  };

  const handleSetAsDefaultPaymentMethod = async (paymentMethodId: string) => {
    setIsLoading(true);
    try {
      const setDefaultPaymentMethod = httpsCallable(
        functions,
        "setDefaultPaymentMethod"
      );
      await setDefaultPaymentMethod({ paymentMethodId });
      successToast("Payment method set as default!");
    } catch (error) {
      console.error("Failed to set as default:", error);
      errorToast(
        error,
        "Failed to set payment method as default. Please try again later."
      );
    } finally {
      closeModalAndRefetch();
      setIsLoading(false);
      resetModal();
    }
  };
  return (
    // margin gives user room to select buttons when keyboard is open
    <View style={{ marginBottom: 300 }}>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 20, textAlign: "center" }}
      >
        Payment Method Details
      </ThemedText>

      <ThemedText
        type="faint"
        style={{ fontSize: 25, fontWeight: "600", marginBottom: 20 }}
      >
        {capitalizeWord(selectedPaymentMethod.brand)} ••••
        {selectedPaymentMethod.last4}
      </ThemedText>

      <ThemedTextInput readOnly value={selectedPaymentMethod.name} />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <ThemedTextInput
          value={String(selectedPaymentMethod.expMonth)}
          readOnly
          style={{ flex: 1, padding: 10 }}
        />

        <ThemedTextInput
          value={String(selectedPaymentMethod.expYear)}
          readOnly
          style={{ flex: 2, padding: 10 }}
        />
      </View>

      <ThemedTextInput readOnly value={selectedPaymentMethod.postalCode} />

      <ThemedButton
        title="Set as Default"
        isLoading={isLoading}
        style={{ marginTop: 20 }}
        disabled={selectedPaymentMethod.isDefault}
        onPress={() =>
          handleSetAsDefaultPaymentMethod(selectedPaymentMethod.id)
        }
      />

      <ThemedButton
        title="Remove Card"
        isLoading={isLoading}
        type="danger"
        onPress={() => handleDeletePaymentMethod(selectedPaymentMethod.id)}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
