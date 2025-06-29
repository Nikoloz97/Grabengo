import { useStripe } from "@stripe/stripe-react-native";
import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { Alert } from "react-native";
import { functions } from "../firebase/config";
import { ThemedButton } from "./themed-button";

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
  const [loading, setLoading] = useState<boolean>(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePlaceOrder = async (): Promise<void> => {
    try {
      setLoading(true);

      if (!orderAmount || orderAmount <= 0) {
        throw new Error("Invalid order amount");
      }
      // creates payment intent for server (input = paymentIntentRequest; output = paymentIntentData)
      // string = corresponding index.ts function
      const createPaymentIntent = httpsCallable<
        PaymentIntentRequest,
        PaymentIntentData
      >(functions, "createPaymentIntent");

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

      // TODO: remove this log eventually
      console.log("Creating payment intent with data:", paymentData);

      const { data } = await createPaymentIntent(paymentData);

      if (!data?.clientSecret) {
        throw new Error(
          "Failed to create payment intent - no client secret received"
        );
      }

      // TODO: remove this log eventually
      console.log("Payment intent created successfully");

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Grabengo",
        paymentIntentClientSecret: data.clientSecret,
        defaultBillingDetails: {
          name: guestInfo?.name || "Guest",
          email: guestInfo?.email,
        },
        appearance: {
          colors: {
            primary: "#007AFF",
            background: "#ffffff",
            componentBackground: "#f3f3f3",
            componentBorder: "#e3e3e3",
            componentDivider: "#e3e3e3",
            primaryText: "#000000",
            secondaryText: "#666666",
            componentText: "#000000",
            placeholderText: "#999999",
          },
          primaryButton: {
            colors: {
              background: "#007AFF",
              text: "#FFFFFF",
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

      Alert.alert("Success", "Payment completed successfully!");
      onPaymentSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";
      // TODO: eventually remove
      console.error("Payment error:", error);
      Alert.alert("Payment Failed", errorMessage);
      onPaymentError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedButton
      onPress={handlePlaceOrder}
      title={loading ? "Processing..." : "Place Order"}
      type="primary"
      disabled={loading || !orderAmount || orderAmount <= 0}
    />
  );
};
