import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
// TODO: eventually replace with DB fetch
import { menuCategories } from "@/constants/menu-items";

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* header */}
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
        {menuCategories.map((category, index) => (
          <View key={index}>
            <ThemedText type="subtitle">{category.name}</ThemedText>

            {category.items.map((item, index) => (
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
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}
