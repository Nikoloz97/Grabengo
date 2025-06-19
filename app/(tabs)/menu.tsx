import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import React from "react";
import { Platform, ScrollView, TouchableOpacity } from "react-native";

const menuItems = [
  {
    name: "Shakes",
    image: "https://placehold.co/100x100/coffee?text=Shakes",
  },
  {
    name: "Smoothies",
    image: "https://placehold.co/100x100/iced?text=Smoothies",
  },
  {
    name: "Beverage",
    image: "https://placehold.co/100x100/tea?text=Beverages",
  },
  {
    name: "Desserts",
    image: "https://placehold.co/100x100/red?text=Desserts",
  },
];

export default function Menu() {
  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Header */}
      <ThemedView
        type="card"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          borderRadius: 0,
          padding: 0,
          marginBottom: 0,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
            },
            android: {
              elevation: 8, // shadow elevation
            },
          }),
        }}
      >
        <ThemedText
          type="title"
          style={{
            paddingTop: 40,
          }}
        >
          Menu
        </ThemedText>
      </ThemedView>

      {/* Menu list */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,

          paddingBottom: 40,
        }}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index}>
            <ThemedView
              type="card"
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
                padding: 10,
                borderRadius: 12,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginRight: 15,
                }}
                contentFit="cover"
              />
              <ThemedText style={{ fontSize: 18 }}>{item.name}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}
