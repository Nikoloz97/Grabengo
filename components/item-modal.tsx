import { Item } from "@/types/menu";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedButton } from "./themed-button";
import { ThemedText } from "./themed-text";

interface ItemModalProps {
  isVisible: boolean;
  item: Item | null;
  addToOrder: () => void;
}

export default function ItemModal({
  isVisible,
  item,
  addToOrder,
}: ItemModalProps) {
  const { colors } = useTheme();
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={addToOrder}
      onBackButtonPress={addToOrder}
      onSwipeComplete={addToOrder}
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
              width: "90%",
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
                addToOrder();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
