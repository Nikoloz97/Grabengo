import { ThemedButton } from "@/components/themed-button";
import useFormValidation from "@/hooks/useFormValidation";
import { guestPaymentSchema } from "@/schemas/guest-payment-modal";
import { GuestInfo } from "@/types/checkout";
import { formatPhoneNumber } from "@/utils/formatters";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";

interface GuestPaymentModalProps {
  isVisible: boolean;
  setIsVisible: (input: boolean) => void;
  displayPayment: (guestInfo?: GuestInfo) => void;
}

type GuestPaymentFields = z.infer<typeof guestPaymentSchema>;

export default function GuestPaymentModal({
  isVisible,
  setIsVisible,
  displayPayment,
}: GuestPaymentModalProps) {
  const { colors } = useTheme();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { errors, validateForm, clearFieldError } =
    useFormValidation<GuestPaymentFields>();

  const handleContinue = async (input: GuestPaymentFields) => {
    const validatedData = validateForm(guestPaymentSchema, input, setIsLoading);
    if (!validatedData) return;
    setIsLoading(true);
    setIsVisible(false);
    displayPayment({ email, name, phone });
    setIsLoading(false);
  };

  const resetModal = () => {
    setEmail("");
    setName("");
    setPhone(undefined);
    setIsVisible(false);
  };

  return (
    <ThemedModal
      isVisible={isVisible}
      onClose={resetModal}
      showSwipeIndicator={false}
      innerViewStyle={{ paddingHorizontal: 10, height: "80%" }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          marginRight: 30,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={resetModal}>
          <Ionicons name="close" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingBottom: 300,
        }}
      >
        <ThemedText
          type="subtitle"
          style={{ marginTop: 20, textAlign: "center" }}
        >
          Guest Info
        </ThemedText>
        <ThemedText style={{ marginTop: 20, color: colors.border }}>
          * indicates required field
        </ThemedText>
        <ThemedTextInput
          placeholder="*Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            clearFieldError("email");
          }}
          error={errors.email}
          style={{ marginTop: 20 }}
        />
        <ThemedTextInput
          placeholder="*Full Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            clearFieldError("name");
          }}
          error={errors.name}
          style={{ flex: 1 }}
        />
        <ThemedTextInput
          placeholder="Phone"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            const formatted = formatPhoneNumber(text);
            setPhone(formatted);
            clearFieldError("phone");
          }}
          error={errors.phone}
          style={{ flex: 1 }}
        />
        <ThemedButton
          title="Continue"
          isLoading={isLoading}
          onPress={() => handleContinue({ email, name, phone })}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </ThemedModal>
  );
}
