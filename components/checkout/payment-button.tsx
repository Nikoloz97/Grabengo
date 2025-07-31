import { useAuth } from "@/contexts/auth-context";
import { GuestInfo } from "@/types/checkout";
import React from "react";
import { ThemedButton } from "../themed-button";

interface PaymentComponentProps {
  orderAmount: number;
  setIsGuestPaymentModalOpen: (input: boolean) => void;
  displayPayment: (guestInfo?: GuestInfo) => void;
  isLoading: boolean;
}

export default function PaymentButton({
  orderAmount,
  setIsGuestPaymentModalOpen,
  displayPayment,
  isLoading,
}: PaymentComponentProps) {
  const { user } = useAuth();

  const handlePlaceOrder = async (): Promise<void> => {
    if (user && user.isAnonymous) {
      setIsGuestPaymentModalOpen(true);
      return;
    }
    displayPayment();
  };

  return (
    <ThemedButton
      onPress={handlePlaceOrder}
      title={isLoading ? "Processing..." : "Place Order"}
      type="primary"
      disabled={isLoading || !orderAmount || orderAmount <= 0}
    />
  );
}
