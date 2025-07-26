import { functions } from "@/firebase/config";
import { PaymentMethod, UserType } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedModal } from "../themed-modal";
import AddPaymentMethodForm from "./add-payment-method";
import EditPaymentMethodForm from "./edit-payment-method";
import PaymentMethodOptions from "./payment-method-options";

interface PaymentMethodsModalProps {
  isVisible: boolean;
  closeModal: () => void;
  closeModalAndRefetch: () => void;
  userType: UserType;
}

export default function PaymentMethodsModal({
  isVisible,
  closeModal,
  closeModalAndRefetch,
  userType,
}: PaymentMethodsModalProps) {
  const { colors } = useTheme();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const [isAddPaymentChosen, setIsAddPaymentChosen] = useState<boolean>(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBack = () => {
    setSelectedPaymentMethod(null);
    setIsAddPaymentChosen(false);
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!isVisible) return;

      setIsLoading(true);

      try {
        const getSavedPaymentMethods = httpsCallable(
          functions,
          "getSavedPaymentMethods"
        );
        const response = await getSavedPaymentMethods({});
        const result = response.data as {
          paymentMethods: PaymentMethod[];
          customerId: string;
        };

        setPaymentMethods(result.paymentMethods);
      } catch (err) {
        console.error("Failed to load payment methods", err);
        setPaymentMethods([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [isVisible]);

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
          <AddPaymentMethodForm
            closeModal={closeModal}
            userType={userType}
            closeModalAndRefetch={closeModalAndRefetch}
          />
        ) : (
          <PaymentMethodOptions
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            setIsAddPaymentChosen={setIsAddPaymentChosen}
            paymentMethods={paymentMethods}
            isLoading={isLoading}
          />
        )}
      </ScrollView>
    </ThemedModal>
  );
}
