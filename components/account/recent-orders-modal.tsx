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
          flex: 1,
          maxHeight: "80%",
          width: "100%",
        }}
      >
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: 30,
            paddingHorizontal: 30,
            flexGrow: 1,
          }}
        >
          <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
            Recent Orders
          </ThemedText>
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
                  <ThemedView style={{ flex: 1, marginTop: 5 }}>
                    {order.items.map((item, index) => (
                      <ThemedText
                        key={index}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {`•  ${item.quantity} - ${item.name}`}
                      </ThemedText>
                    ))}
                  </ThemedView>
                  <ThemedText style={{ color: colors.border, marginTop: 10 }}>
                    Total
                  </ThemedText>
                  <ThemedText style={{ flex: 1, marginTop: 5 }}>
                    {dollarFormatter(order.totalAmount)}
                  </ThemedText>
                  <ThemedText style={{ color: colors.border, marginTop: 10 }}>
                    Status
                  </ThemedText>
                  <View style={{ flexDirection: "row" }}>
                    <ThemedText style={{ flex: 1, marginTop: 5 }}>
                      {order.status}
                    </ThemedText>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderColor: "rgba(49, 211, 20, 0.15)",
                        backgroundColor: colors.primary,
                      }}
                    >
                      <TouchableOpacity
                        onPress={addToOrder}
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 20,
                        }}
                      >
                        <IconSymbol size={20} name="plus" color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
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
