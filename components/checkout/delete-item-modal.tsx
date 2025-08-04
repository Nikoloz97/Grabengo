import { useCart } from "@/contexts/cart-context";
import { CartItem } from "@/types/menu";
import { dollarFormatter } from "@/utils/formatters";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";

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
  const { removeFromCart } = useCart();

  if (!item) return null;

  const resetModal = () => {
    setItem(null);
  };

  const handleItemRemoval = (itemId: number, itemName: string) => {
    try {
      removeFromCart(itemId);
      resetModal();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `${itemName} removed from cart!`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to process. Please try again.",
      });
    }
  };

  return (
    <ThemedModal isVisible={isVisible} onClose={resetModal}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", marginTop: 30 }}
      >
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
          type="subtitle"
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
          {dollarFormatter(item.price)}
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
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <ThemedButton title="Cancel" type="primary" onPress={resetModal} />
          <ThemedButton
            title="Confirm"
            type="primary"
            onPress={() => {
              handleItemRemoval(item.id, item.name);
            }}
          />
        </View>
      </ScrollView>
    </ThemedModal>
  );
}
