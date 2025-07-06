import { useCart } from "@/contexts/cart-context";
import { Item } from "@/types/menu";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedButton } from "../themed-button";
import { ThemedText } from "../themed-text";

interface AddItemModalProps {
  isVisible: boolean;
  item: Item | null;
  setItem: (item: Item | null) => void;
}

export default function ItemModal({
  isVisible,
  item,
  setItem,
}: AddItemModalProps) {
  const { colors } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!item) return null;

  const resetModal = () => {
    setItem(null);
    setQuantity(1);
  };

  const addToOrder = (item: Item, quantity: number) => {
    addToCart({ ...item, quantity });
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
          }}
        />

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

          {/* Quantity + Add Button Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 30,
              alignItems: "center",
              marginTop: 10,
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
                <ThemedText style={{ color: "#fff", fontSize: 18 }}>
                  −
                </ThemedText>
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
                <ThemedText style={{ color: "#fff", fontSize: 18 }}>
                  +
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Add to Order Button */}
            <ThemedButton
              title="Add to Order"
              type="primary"
              onPress={() => {
                addToOrder(item, quantity);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
