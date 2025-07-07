import { recentOrders } from "@/constants/temporary/recent-orders";
import { dollarFormatter } from "@/hooks/formatters";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import React from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedButton } from "../themed-button";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/IconSymbol";

interface RecentOrdersModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function RecentOrdersModal({
  isVisible,
  closeModal,
}: RecentOrdersModalProps) {
  const { colors } = useTheme();

  const addToOrder = () => {
    closeModal();
  };

  if (recentOrders.length === 0) {
    return (
      // TODO: make modal, view, and modal elements a reusable wrapper
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        onSwipeComplete={closeModal}
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
            }}
          />
          <ThemedView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ThemedText>No past orders found :(</ThemedText>
          </ThemedView>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      onSwipeComplete={closeModal}
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
          }}
        />

        <ScrollView
          contentContainerStyle={{ alignItems: "center", marginTop: 30 }}
        >
          {recentOrders.map((order, index) => (
            <View key={index} style={{ width: "100%" }}>
              <ThemedText style={{ color: colors.border }}>
                {format(order.orderDate, "EEE, MMM d (h:mm aa)")}
              </ThemedText>
              <ThemedView
                type="card"
                style={{
                  flexDirection: "column",
                  marginTop: 10,
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
                {/* TODO: replace with circular button in bottom corner */}
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
                    backgroundColor: colors.primary,
                    overflow: "hidden",
                    zIndex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={addToOrder}
                    style={{
                      flex: 1,
                      paddingHorizontal: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconSymbol size={20} name="plus.fill" color="white" />
                  </TouchableOpacity>
                </View>

                {/* main content */}
                <View
                  style={{
                    alignItems: "flex-start",
                    flex: 1,
                  }}
                >
                  <ThemedText style={{ color: colors.border }}>
                    Items
                  </ThemedText>
                  <ThemedText
                    style={{ flex: 1, marginTop: 5 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {order.items.map((item) => item.name).join(", ")}
                  </ThemedText>
                  <ThemedText style={{ color: colors.border, marginTop: 10 }}>
                    Total
                  </ThemedText>
                  <ThemedText style={{ flex: 1, marginTop: 5, marginLeft: 5 }}>
                    {dollarFormatter(order.totalAmount)}
                  </ThemedText>
                </View>
              </ThemedView>
            </View>
          ))}

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
            <ThemedButton title="Close" type="primary" onPress={closeModal} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
