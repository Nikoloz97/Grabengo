import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

const menuItems = [
  {
    name: "Hot Coffee",
    image: "https://placehold.co/100x100/coffee?text=Hot+Coffee",
  },
  {
    name: "Cold Coffee",
    image: "https://placehold.co/100x100/iced?text=Cold+Coffee",
  },
  {
    name: "Hot Tea",
    image: "https://placehold.co/100x100/tea?text=Hot+Tea",
  },
  {
    name: "Cold Tea",
    image: "https://placehold.co/100x100/greentea?text=Cold+Tea",
  },
  {
    name: "Refreshers",
    image: "https://placehold.co/100x100/red?text=Refreshers",
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
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
      >
        <ThemedText type="title">Drinks</ThemedText>
        <TouchableOpacity>
          <ThemedText style={{ color: "#006241", fontWeight: "bold" }}>
            See all 121
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Menu list */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 40,
        }}
      >
        {menuItems.map((item, index) => (
          <ThemedView
            key={index}
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
        ))}
      </ScrollView>
    </ThemedView>
  );
}
