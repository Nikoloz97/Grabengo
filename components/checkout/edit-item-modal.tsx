import { useCart } from "@/contexts/cart-context";
import { dollarFormatter } from "@/hooks/formatters";
import { CartItem } from "@/types/menu";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";

interface EditItemModalProps {
  isVisible: boolean;
  item: CartItem;
  setItem: (item: CartItem | null) => void;
}

export default function EditItemModal({
  isVisible,
  item,
  setItem,
}: EditItemModalProps) {
  const { colors } = useTheme();
  const [quantity, setQuantity] = useState(item ? item.quantity : 1);
  const { editCart } = useCart();

  const hasChanges = useMemo(() => {
    return quantity !== item.quantity;
  }, [quantity, item]);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
  }, [item]);

  if (!item) return null;

  const resetModal = () => {
    setItem(null);
    setQuantity(1);
  };

  const editOrder = (itemId: number, quantity: number) => {
    try {
      editCart(itemId, quantity);
      resetModal();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `${item.name} edited in cart!`,
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
        {/* Quantity + Add Button Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 30,
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity === 1}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 5,
                backgroundColor: quantity === 1 ? "#ccc" : colors.primary,
                marginRight: 8,
              }}
            >
              <ThemedText style={{ color: "#fff", fontSize: 18 }}>−</ThemedText>
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 16, marginHorizontal: 4 }}>
              {quantity}
            </ThemedText>
            <TouchableOpacity
              onPress={() => setQuantity((prev) => prev + 1)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 5,
                backgroundColor: colors.primary,
                marginLeft: 8,
              }}
            >
              <ThemedText style={{ color: "#fff", fontSize: 18 }}>+</ThemedText>
            </TouchableOpacity>
          </View>
          {/* Edit Order Button */}
          <ThemedButton
            title="Edit Order"
            type="primary"
            disabled={!hasChanges}
            onPress={() => {
              editOrder(item.id, quantity);
            }}
          />
        </View>
      </ScrollView>
    </ThemedModal>
  );
}
