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
import { Platform, TouchableOpacity, View } from "react-native";

export default function CheckoutScreen() {
  const { cart, cartTotal } = useCart();
  const [itemToEdit, setItemToEdit] = useState<CartItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

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
                  borderBottomColor: "rgba(49, 211, 20, 0.15)",
                }}
              >
                <IconSymbol size={20} name="pencil" color="green" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setItemToDelete(item)}
                style={{
                  flex: 1,
                  paddingHorizontal: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconSymbol size={20} name="minus" color="green" />
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
                  Quantity: {item.quantity} • Total: $
                  {(item.price * item.quantity).toFixed(2)}
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
              ${cartTotal.toFixed(2)}
            </ThemedText>
          </View>
        </ThemedView>

        <View style={{ marginTop: 30 }}>
          <ThemedButton title="Place Order" type="primary" />
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
