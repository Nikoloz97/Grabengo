import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6BD815",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: colors.background,
            opacity: 1,
            position: "absolute",
          },
        }),
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <View
              style={{
                flex: 1,
                shadowColor: "black",
                shadowOffset: { width: 0, height: -10 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              }}
            >
              <BlurView intensity={30} tint="default" style={{ flex: 1 }} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: "rgb(59, 59, 59)",
                elevation: 10,
              }}
            />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="menucard.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: "Checkout",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="person.crop.circle.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
