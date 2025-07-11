import { PaymentMethod } from "@/types/user";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { ThemedModal } from "../themed-modal";
import { EditPaymentMethodForm } from "./edit-payment-method";
import PaymentMethodOptions from "./payment-method-options";

interface PaymentMethodsModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function PaymentMethodsModal({
  isVisible,
  closeModal,
}: PaymentMethodsModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const updatePaymentMethod = () => {
    Alert.alert("Payment Method Updated!");
  };

  const removePaymentMethod = () => {
    Alert.alert("Payment Method Removed!");
  };

  const setDefaultPaymentMethod = () => {
    Alert.alert("Payment Method Set as Default!");
  };

  return (
    <ThemedModal
      isVisible={isVisible}
      onClose={closeModal}
      showSwipeIndicator={false}
      innerViewStyle={{ paddingHorizontal: 10, height: "80%" }}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          marginTop: 30,
          paddingHorizontal: 30,
        }}
      >
        {selectedPaymentMethod ? (
          <EditPaymentMethodForm
            paymentMethod={selectedPaymentMethod}
            onBack={() => setSelectedPaymentMethod(null)}
            onSave={updatePaymentMethod}
            onRemove={removePaymentMethod}
            onSetDefault={setDefaultPaymentMethod}
          />
        ) : (
          <PaymentMethodOptions
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            closeModal={closeModal}
          />
        )}
      </ScrollView>
    </ThemedModal>
  );
}
