import { recentOrders } from "@/constants/temporary/recent-orders";
import { errorToast, successToast } from "@/hooks/default-toasts";
import { dollarFormatter } from "@/hooks/formatters";
import { UserType } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import React from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/IconSymbol";

interface RecentOrdersModalProps {
  isVisible: boolean;
  closeModal: () => void;
  userType: UserType;
}

export default function RecentOrdersModal({
  isVisible,
  closeModal,
  userType,
}: RecentOrdersModalProps) {
  const { colors } = useTheme();

  const handleAddToOrder = () => {
    try {
      successToast("Added to cart!");
    } catch (error) {
      errorToast(error);
    } finally {
      closeModal();
    }
  };

  if (recentOrders.length === 0) {
    return (
      <ThemedModal isVisible={isVisible} onClose={closeModal}>
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText>No past orders found :(</ThemedText>
        </ThemedView>
      </ThemedModal>
    );
  }

  return (
    <ThemedModal
      isVisible={isVisible}
      onClose={closeModal}
      showSwipeIndicator={false}
      innerViewStyle={{ paddingHorizontal: 10, maxHeight: "80%" }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          marginRight: 30,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={closeModal}>
          <Ionicons name="close" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
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
                <ThemedText style={{ color: colors.border }}>Items</ThemedText>
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
                      onPress={handleAddToOrder}
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
      </ScrollView>
    </ThemedModal>
  );
}
