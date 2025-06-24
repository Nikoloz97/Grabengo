import DeleteItemModal from "@/components/delete-item-modal";
import EditItemModal from "@/components/edit-item-modal";
import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCart } from "@/contexts/cart-context";
import { CartItem } from "@/types/cart";
import { Image } from "expo-image";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function CheckoutScreen() {
  const { cart, cartTotal } = useCart();
  const [itemToEdit, setItemToEdit] = useState<CartItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Header */}
      <ThemedHeaderView>
        <ThemedText type="title">Guest Checkout ({cart.length})</ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView
        style={{
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
                  <TouchableOpacity onPress={() => setItemToEdit(item)}>
                    <IconSymbol size={20} name="pencil" color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setItemToDelete(item)}>
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
              marginTop: 5,
              borderTopWidth: 1,
              borderColor: "#ccc",
              paddingTop: 10,
              paddingHorizontal: 5,
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
      {/* Item Modal */}
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
