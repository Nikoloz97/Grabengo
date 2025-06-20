import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useCart } from "@/contexts/cart-context";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import React, { useState } from "react";
import { View } from "react-native";

export default function CheckoutScreen() {
  const { cart, cartTotal } = useCart();
  const [pickupMethod, setPickupMethod] = useState("In store");
  const [pickupTime, setPickupTime] = useState("4–7 mins");

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Header */}
      <ThemedHeaderView
        style={{ flexDirection: "column", gap: 20, paddingHorizontal: 20 }}
      >
        <ThemedText type="title" style={{ paddingTop: 40 }}>
          Guest Checkout ({cart.length})
        </ThemedText>

        {/* Pickup Method/Time Container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <ThemedText style={{ fontWeight: "bold", marginBottom: 5 }}>
              Pickup method
            </ThemedText>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={pickupMethod}
                onValueChange={(value) => setPickupMethod(value)}
                style={{ height: 40 }}
              >
                <Picker.Item label="In store" value="In store" />
                <Picker.Item label="Curbside" value="Curbside" />
                <Picker.Item label="Drive-thru" value="Drive-thru" />
              </Picker>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <ThemedText style={{ fontWeight: "bold", marginBottom: 5 }}>
              Pickup time
            </ThemedText>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={pickupTime}
                onValueChange={(value) => setPickupTime(value)}
                style={{ height: 40 }}
              >
                <Picker.Item label="4–7 mins" value="4–7 mins" />
                <Picker.Item label="10–15 mins" value="10–15 mins" />
                <Picker.Item label="20+ mins" value="20+ mins" />
              </Picker>
            </View>
          </View>
        </View>
      </ThemedHeaderView>

      <ThemedScrollView
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: 40,
          paddingHorizontal: 15,
        }}
      >
        {/* Cart Items */}
        {cart.map((item, index) => (
          <ThemedView
            key={index}
            type="card"
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginBottom: 10,
              borderRadius: 12,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 15,
              }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <ThemedText style={{ fontWeight: "600" }}>{item.name}</ThemedText>
              <ThemedText style={{ fontSize: 14, color: "#777" }}>
                {item.calories} calories • Qty: {item.quantity}
              </ThemedText>
            </View>
            <ThemedText style={{ fontWeight: "600" }}>
              ${(item.price * item.quantity).toFixed(2)}
            </ThemedText>
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
