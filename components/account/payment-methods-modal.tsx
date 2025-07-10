import { userPaymentMethods } from "@/constants/temporary/payment-methods";
import { capitalizeWord } from "@/hooks/formatters";
import { Ionicons } from "@expo/vector-icons"; // for chevron and plus icons
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";

interface PaymentMethodsModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function PaymentMethodsModal({
  isVisible,
  closeModal,
}: PaymentMethodsModalProps) {
  const { colors } = useTheme();

  return (
    <ThemedModal
      isVisible={isVisible}
      onClose={closeModal}
      showSwipeIndicator={false}
      innerViewStyle={{ paddingHorizontal: 10, maxHeight: "80%" }}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          marginTop: 30,
          paddingHorizontal: 30,
        }}
      >
        <ThemedText
          type="subtitle"
          style={{ marginBottom: 20, textAlign: "center" }}
        >
          Payment Methods
        </ThemedText>

        {userPaymentMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: colors.card,
              padding: 16,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              width: "100%",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                style={{
                  width: 40,
                  height: 20,
                  resizeMode: "contain",
                  backgroundColor: "orange",
                }}
              />
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: colors.text }}
              >
                {capitalizeWord(method.card.brand)} ••••{method.card.last4}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </TouchableOpacity>
        ))}

        {/* Add payment option */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.card,
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 5,
            elevation: 1,
          }}
          onPress={() => {
            // logic to add new payment
          }}
        >
          <Ionicons name="add-circle-outline" size={20} color={colors.text} />
          <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
            Add payment
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 30,
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <ThemedButton title="Close" type="primary" onPress={closeModal} />
        </View>
      </ScrollView>
    </ThemedModal>
  );
}
