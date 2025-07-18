import { PaymentMethod, UserType } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedModal } from "../themed-modal";
import AddPaymentMethodForm from "./add-payment-method";
import EditPaymentMethodForm from "./edit-payment-method";
import PaymentMethodOptions from "./payment-method-options";

interface PaymentMethodsModalProps {
  isVisible: boolean;
  closeModal: () => void;
  userType: UserType;
}

export default function PaymentMethodsModal({
  isVisible,
  closeModal,
  userType,
}: PaymentMethodsModalProps) {
  const { colors } = useTheme();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const [isAddPaymentChosen, setIsAddPaymentChosen] = useState<boolean>(false);

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
            selectedPaymentMethod={selectedPaymentMethod}
            closeModal={closeModal}
          />
        ) : isAddPaymentChosen ? (
          <AddPaymentMethodForm closeModal={closeModal} />
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
