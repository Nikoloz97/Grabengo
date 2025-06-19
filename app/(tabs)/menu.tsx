import ItemModal from "@/components/item-modal";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { menuCategories } from "@/constants/menu-items";
import { Item } from "@/types/menu";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
      <ThemedScrollView>
        {/* TODO: eventually replace with DB fetch */}
        {menuCategories.map((category, index) => (
          <View key={index}>
            <ThemedText type="subtitle" style={{ marginVertical: 15 }}>
              {category.name}
            </ThemedText>

            {category.items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedItem(item)}
              >
                <ThemedView
                  type="card"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
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
                  <ThemedText>{item.name}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ThemedScrollView>
      {/* Item Modal */}
      <ItemModal
        isVisible={selectedItem !== null}
        item={selectedItem}
        addToOrder={() => setSelectedItem(null)}
      />
    </ThemedView>
  );
}
