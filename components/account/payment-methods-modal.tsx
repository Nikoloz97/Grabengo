import { PaymentMethod } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedModal } from "../themed-modal";
import AddPaymentMethodForm from "./add-payment-method";
import EditPaymentMethodForm from "./edit-payment-method";
import PaymentMethodOptions from "./payment-method-options";

interface PaymentMethodsModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function PaymentMethodsModal({
  isVisible,
  closeModal,
}: PaymentMethodsModalProps) {
  const { colors } = useTheme();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const [isAddPaymentChosen, setIsAddPaymentChosen] = useState<boolean>(false);

  const addPaymentMethod = () => {
    Alert.alert("Payment Method Added!");
  };

  const updatePaymentMethod = () => {
    Alert.alert("Payment Method Updated!");
  };

  const removePaymentMethod = () => {
    Alert.alert("Payment Method Removed!");
  };

  const handleBack = () => {
    setSelectedPaymentMethod(null);
    setIsAddPaymentChosen(false);
  };

  return (
    <ThemedModal
      isVisible={isVisible}
      onClose={closeModal}
      showSwipeIndicator={false}
      innerViewStyle={{ paddingHorizontal: 10, height: "80%" }}
    >
      {selectedPaymentMethod || isAddPaymentChosen ? (
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            marginLeft: 30,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={() => handleBack()}>
            <Ionicons name="arrow-back" size={25} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
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
      )}

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          paddingHorizontal: 30,
        }}
      >
        {selectedPaymentMethod ? (
          <EditPaymentMethodForm
            paymentMethod={selectedPaymentMethod}
            onSave={updatePaymentMethod}
            onRemove={removePaymentMethod}
          />
        ) : isAddPaymentChosen ? (
          <AddPaymentMethodForm onAdd={addPaymentMethod} />
        ) : (
          <PaymentMethodOptions
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            setIsAddPaymentChosen={setIsAddPaymentChosen}
          />
        )}
      </ScrollView>
    </ThemedModal>
  );
}
