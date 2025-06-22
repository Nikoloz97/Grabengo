import { useCart } from "@/contexts/cart-context";
import { CartItem } from "@/types/cart";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedButton } from "./themed-button";
import { ThemedText } from "./themed-text";

interface DeleteItemModalProps {
  isVisible: boolean;
  item: CartItem;
  setItem: (item: CartItem | null) => void;
}

export default function DeleteItemModal({
  isVisible,
  item,
  setItem,
}: DeleteItemModalProps) {
  const { colors } = useTheme();
  const { removeFromCart } = useCart();

  if (!item) return null;

  const resetModal = () => {
    setItem(null);
  };

  const deleteOrder = (itemId: number) => {
    removeFromCart(itemId);
    resetModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={resetModal}
      onBackButtonPress={resetModal}
      onSwipeComplete={resetModal}
      swipeDirection="down"
      propagateSwipe={true}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          paddingTop: 20,
          paddingBottom: 80,
          paddingHorizontal: 40,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: "center",
        }}
      >
        {/* Swipe indicator */}
        <View
          style={{
            width: 50,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: colors.primary,
            marginBottom: 10,
          }}
        />

        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {/* Image */}
          <Image
            source={{ uri: item.image }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "orange",
            }}
            contentFit="cover"
          />

          <ThemedText
            type="title"
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {item.name}
          </ThemedText>

          <ThemedText style={{ color: "#999", marginVertical: 5 }}>
            {item.calories} calories • {item.protein}g protein • $
            {item.price.toFixed(2)}
          </ThemedText>

          {/* Description */}
          <ThemedText
            style={{
              fontSize: 14,
              color: "#777",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 20,
              marginHorizontal: 20,
            }}
          >
            {item.description}
          </ThemedText>

          <ThemedText style={{ textAlign: "center", fontWeight: "bold" }}>
            Are you sure you want to remove this item from your cart?
          </ThemedText>

          {/* cancel/confirm buttons row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 30,
              alignItems: "center",
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <ThemedButton title="Cancel" type="primary" onPress={resetModal} />

            <ThemedButton
              title="Confirm"
              type="primary"
              onPress={() => {
                deleteOrder(item.id);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
