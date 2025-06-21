import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCart } from "@/contexts/cart-context";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function CheckoutScreen() {
  const { cart, cartTotal } = useCart();

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Header */}
      <ThemedHeaderView>
        <ThemedText type="title" style={{ paddingTop: 40 }}>
          Guest Checkout ({cart.length})
        </ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView
        contentContainerStyle={{
          marginTop: 20,
          paddingHorizontal: 15,
          paddingBottom: 100,
        }}
      >
        {/* Cart Items */}
        {cart.map((item, index) => (
          <ThemedView
            key={index}
            type="card"
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              marginBottom: 10,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
              <View style={{ flex: 1, gap: 5 }}>
                <ThemedText style={{ fontWeight: "600" }}>
                  {item.name} ({item.quantity})
                </ThemedText>
                <ThemedText style={{ fontSize: 14, color: "#777" }}>
                  {item.calories} calories • {item.protein}g protein
                </ThemedText>
              </View>

              <View style={{ flexDirection: "column", gap: 5 }}>
                <ThemedText style={{ fontWeight: "600" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </ThemedText>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity>
                    <IconSymbol size={20} name="pencil" color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <IconSymbol size={20} name="trash" color="green" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ThemedView>
        ))}

        {/* Summary */}
        <ThemedView
          type="card"
          style={{
            padding: 15,
            marginTop: 20,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <ThemedText>Subtotal</ThemedText>
            <ThemedText>${cartTotal.toFixed(2)}</ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <ThemedText>Tax</ThemedText>
            <ThemedText>$0.00</ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              borderTopWidth: 1,
              borderColor: "#ccc",
              paddingTop: 10,
            }}
          >
            <ThemedText style={{ fontWeight: "bold" }}>Total</ThemedText>
            <ThemedText style={{ fontWeight: "bold" }}>
              ${cartTotal.toFixed(2)}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Place Order Button */}
        <View style={{ marginTop: 30 }}>
          <ThemedButton title="Place Order" type="primary" />
        </View>
      </ThemedScrollView>
    </ThemedView>
  );
}
