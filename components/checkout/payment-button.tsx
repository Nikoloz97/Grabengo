import { functions } from "@/firebase/config";
import { useStripe } from "@stripe/stripe-react-native";
import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { Alert } from "react-native";
import { ThemedButton } from "../themed-button";

interface PaymentIntentRequest {
  amount: number;
  currency: string;
  guestEmail?: string;
  guestName?: string;
}

interface PaymentIntentData {
  clientSecret: string;
  paymentIntentId: string;
}

interface PaymentComponentProps {
  orderAmount: number;
  currency?: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
  guestInfo?: {
    email?: string;
    name?: string;
  };
}

export const PaymentButton: React.FC<PaymentComponentProps> = ({
  orderAmount,
  currency = "usd",
  onPaymentSuccess,
  onPaymentError,
  guestInfo,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePlaceOrder = async (): Promise<void> => {
    try {
      setIsLoading(true);

      if (!orderAmount || orderAmount <= 0) {
        throw new Error("Invalid order amount");
      }
      // creates payment intent for server (input = paymentIntentRequest; output = paymentIntentData)
      const createPaymentIntent = httpsCallable<
        PaymentIntentRequest,
        PaymentIntentData
      >(functions, "createPaymentIntent"); // string input = corresponding index.ts function

      const paymentData: PaymentIntentRequest = {
        amount: orderAmount,
        currency,
      };

      if (guestInfo?.email) {
        paymentData.guestEmail = guestInfo.email;
      }
      if (guestInfo?.name) {
        paymentData.guestName = guestInfo.name;
      }

      const { data } = await createPaymentIntent(paymentData);

      if (!data?.clientSecret) {
        throw new Error(
          "Failed to create payment intent - no client secret received"
        );
      }

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Grabengo",
        paymentIntentClientSecret: data.clientSecret,
        defaultBillingDetails: {
          name: guestInfo?.name || "Guest",
          email: guestInfo?.email,
        },
        appearance: {
          colors: {
            // need to use hex values (see colors constant)
            primary: "#fcfcfc",
            background: "#1f1f1f",
            componentBackground: "#1f1f1f",
            componentBorder: "#fcfcfc",
            componentDivider: "#fcfcfc",
            primaryText: "#fcfcfc",
            secondaryText: "#fcfcfc",
            componentText: "#fcfcfc",
            placeholderText: "#999999",
          },
          primaryButton: {
            colors: {
              background: "#6bd815",
              text: "#fcfcfc",
            },
          },
        },
        allowsDelayedPaymentMethods: true,
      });

      if (initError) {
        // TODO: eventually remove
        console.error("Failed to initialize payment sheet:", initError);
        throw new Error(`Payment setup failed: ${initError.message}`);
      }

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code === "Canceled") {
          // TODO: eventually remove
          console.log("Payment was canceled by user");
          return;
        }
        // TODO: eventually remove
        console.error("Payment presentation failed:", presentError);
        throw new Error(`Payment failed: ${presentError.message}`);
      }

      onPaymentSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";
      // TODO: eventually remove
      console.error("Payment error:", error);
      Alert.alert("Payment Failed", errorMessage);
      onPaymentError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedButton
      onPress={handlePlaceOrder}
      title={isLoading ? "Processing..." : "Place Order"}
      type="primary"
      disabled={isLoading || !orderAmount || orderAmount <= 0}
    />
  );
};
