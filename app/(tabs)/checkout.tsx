import DeleteItemModal from "@/components/checkout/delete-item-modal";
import EditItemModal from "@/components/checkout/edit-item-modal";
import GuestPaymentModal from "@/components/checkout/guest-payment-modal";
import PaymentButton from "@/components/checkout/payment-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCart } from "@/contexts/cart-context";
import { functions } from "@/firebase/config";
import { errorToast } from "@/hooks/default-toasts";
import { dollarFormatter } from "@/hooks/formatters";
import { GuestInfo } from "@/types/checkout";
import { CartItem } from "@/types/menu";
import { useTheme } from "@react-navigation/native";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { Alert, Platform, TouchableOpacity, View } from "react-native";

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

export default function CheckoutScreen() {
  const { cart, cartTotal, clearCart } = useCart();
  const [itemToEdit, setItemToEdit] = useState<CartItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [isGuestPaymentModalOpen, setIsGuestPaymentModalOpen] =
    useState<boolean>(false);
  const [isPaymentButtonLoading, setIsPaymentButtonLoading] =
    useState<boolean>(false);
  const { colors } = useTheme();

  const displayPayment = async (guestInfo?: GuestInfo) => {
    try {
      setIsPaymentButtonLoading(true);
      if (!cartTotal || cartTotal <= 0) {
        throw new Error("Invalid order amount");
      }
      // creates payment intent for server (input = paymentIntentRequest; output = paymentIntentData)
      const createPaymentIntent = httpsCallable<
        PaymentIntentRequest,
        PaymentIntentData
      >(functions, "createPaymentIntent"); // string input = corresponding index.ts function

      const paymentData: PaymentIntentRequest = {
        amount: cartTotal,
        currency: "usd",
      };

      if (guestInfo) {
        paymentData.guestEmail = guestInfo.email;
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
          name: guestInfo?.name,
          email: guestInfo?.email,
          phone: guestInfo?.phone,
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

      console.log(`Failed to create payment sheet: ${initError?.message}`);

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code === "Canceled") {
          console.log("Payment was canceled by user");
          return;
        }

        errorToast(
          null,
          `Payment presentation failed: ${presentError?.message}`
        );
      }
      handlePaymentSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";

      errorToast(null, `Payment failed: ${errorMessage}`);
      Alert.alert("Payment Failed", errorMessage);
    } finally {
      setIsPaymentButtonLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    router.push("/");
    Alert.alert(
      "Order Confirmed!",
      "Thank you for your purchase. Your order has been placed successfully.",
      [
        {
          text: "OK",
          onPress: () => {},
        },
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedHeaderView>
          <ThemedText type="title">CHECKOUT </ThemedText>
        </ThemedHeaderView>
        <ThemedText>Your cart is empty :(</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title"> CHECKOUT </ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* cart items */}
        {cart.map((item, index) => (
          <ThemedView
            key={index}
            type="card"
            style={{
              flexDirection: "column",
              marginBottom: 30,
              borderRadius: 12,
              position: "relative",
              ...Platform.select({
                ios: {
                  shadowColor: "rgb(0, 0, 0)",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                },
                android: {
                  elevation: 4,
                },
              }),
            }}
          >
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                flexDirection: "column",
                borderColor: "rgba(49, 211, 20, 0.15)",
                borderWidth: 1,
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => setItemToEdit(item)}
                style={{
                  flex: 1,
                  paddingHorizontal: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: colors.background,
                  backgroundColor: colors.primary,
                }}
              >
                <IconSymbol size={20} name="pencil" color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setItemToDelete(item)}
                style={{
                  flex: 1,
                  paddingHorizontal: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.primary,
                }}
              >
                <IconSymbol size={20} name="minus" color="white" />
              </TouchableOpacity>
            </View>

            {/* main content */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginRight: 15,
                  backgroundColor: "orange",
                }}
                contentFit="cover"
              />
              <View style={{ gap: 5, width: "65%" }}>
                <ThemedText>{item.name}</ThemedText>
                <ThemedText style={{ fontSize: 14, color: "#777" }}>
                  {item.calories} calories • {item.protein}g protein
                </ThemedText>
                <ThemedText style={{ fontSize: 14, color: "#777" }}>
                  Quantity: {item.quantity} • Total:
                  {" " + dollarFormatter(item.price * item.quantity)}
                </ThemedText>
              </View>
            </View>
          </ThemedView>
        ))}

        {/* total */}
        <ThemedView
          type="card"
          style={{
            padding: 15,
            marginTop: 20,
            borderRadius: 12,
            ...Platform.select({
              ios: {
                shadowColor: "rgb(0, 0, 0)",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
              },
              android: {
                elevation: 4,
              },
            }),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              borderTopWidth: 1,
              borderColor: "#ccc",
              paddingTop: 10,
              paddingHorizontal: 5,
            }}
          >
            <ThemedText style={{ fontWeight: "bold" }}>Total</ThemedText>
            <ThemedText style={{ fontWeight: "bold" }}>
              {dollarFormatter(cartTotal)}
            </ThemedText>
          </View>
        </ThemedView>

        <View style={{ marginTop: 30 }}>
          <PaymentButton
            orderAmount={cartTotal}
            setIsGuestPaymentModalOpen={setIsGuestPaymentModalOpen}
            displayPayment={displayPayment}
            isLoading={isPaymentButtonLoading}
          />
        </View>
      </ThemedScrollView>
      {/* modals*/}
      {itemToEdit && (
        <EditItemModal
          isVisible={itemToEdit !== null}
          item={itemToEdit!} // won't be visible without it
          setItem={setItemToEdit}
        />
      )}

      {itemToDelete && (
        <DeleteItemModal
          isVisible={itemToDelete !== null}
          item={itemToDelete!} // won't be visible without it
          setItem={setItemToDelete}
        />
      )}

      <GuestPaymentModal
        isVisible={isGuestPaymentModalOpen}
        setIsVisible={setIsGuestPaymentModalOpen}
        displayPayment={displayPayment}
      />
    </ThemedView>
  );
}
