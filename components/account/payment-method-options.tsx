import { capitalizeWord } from "@/hooks/formatters";
import { PaymentMethod } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

interface PaymentMethodOptionsProps {
  setSelectedPaymentMethod: (method: PaymentMethod) => void;
  setIsAddPaymentChosen: (isChosen: boolean) => void;
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
}

export default function PaymentMethodsOptions({
  setSelectedPaymentMethod,
  setIsAddPaymentChosen,
  paymentMethods,
  isLoading,
}: PaymentMethodOptionsProps) {
  const { colors } = useTheme();

  return (
    <View>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 40, textAlign: "center" }}
      >
        Payment Methods
      </ThemedText>
      {/* payment method options */}
      {isLoading ? (
        <View
          style={{
            backgroundColor: colors.card,
            padding: 16,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 12,
            width: "100%",
          }}
        >
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
          <ThemedText>Loading payment methods...</ThemedText>
        </View>
      ) : (
        paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={{
              backgroundColor: colors.card,
              padding: 16,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              width: "100%",
              ...{
                ...(method.isDefault && {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  borderWidth: 1,
                }),
              },
            }}
            onPress={() => {
              setSelectedPaymentMethod(method);
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
                {capitalizeWord(method.brand)} ••••{method.last4}
              </Text>
              {method.isDefault && (
                <ThemedText type="faint">Default</ThemedText>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </TouchableOpacity>
        ))
      )}

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
        onPress={() => setIsAddPaymentChosen(true)}
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
      ></View>
    </View>
  );
}
