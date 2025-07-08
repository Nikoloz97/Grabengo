import DeleteItemModal from "@/components/checkout/delete-item-modal";
import EditItemModal from "@/components/checkout/edit-item-modal";
import { PaymentButton } from "@/components/checkout/payment-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCart } from "@/contexts/cart-context";
import { dollarFormatter } from "@/hooks/formatters";
import { CartItem } from "@/types/menu";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, TouchableOpacity, View } from "react-native";

export default function CheckoutScreen() {
  const { cart, cartTotal, clearCart } = useCart();
  const [itemToEdit, setItemToEdit] = useState<CartItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const { colors } = useTheme();

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
        <ThemedText>Your cart is empty :(</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">GUEST CHECKOUT ({cart.length})</ThemedText>
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
          {/* TODO: pass guest info props if user not signed in?? (email + name) */}
          <PaymentButton
            orderAmount={cartTotal}
            currency="usd"
            onPaymentSuccess={handlePaymentSuccess}
          />
        </View>
      </ThemedScrollView>
      {/* item modals*/}
      {itemToEdit && (
        <EditItemModal
          isVisible={itemToEdit !== null}
          item={itemToEdit}
          setItem={setItemToEdit}
        />
      )}
      {itemToDelete && (
        <DeleteItemModal
          isVisible={itemToDelete !== null}
          item={itemToDelete}
          setItem={setItemToDelete}
        />
      )}
    </ThemedView>
  );
}
