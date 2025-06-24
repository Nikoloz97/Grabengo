import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { homeContent } from "@/constants/home-content";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      {/* header */}
      <ThemedHeaderView>
        <ThemedText type="title">Grabengo</ThemedText>
      </ThemedHeaderView>
      {/* main */}
      <ThemedScrollView
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 20,
          marginBottom: 100,
          paddingBottom: 950, // ensures scroll doesnt cut off items
        }}
      >
        {homeContent.map((content) => (
          <View
            key={content.id}
            style={{
              position: "relative",
              width: "85%",
              height: 180,
              marginBottom: 100,
            }}
          >
            <Image
              source={{
                uri: content.uri,
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
                backgroundColor: "orange",
              }}
            />
            <ThemedText
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                fontSize: 20,
                fontWeight: "bold",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6,
              }}
            >
              {content.header}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                paddingHorizontal: 10,
                paddingVertical: 5,
                color: "rgba(252, 252, 252, 0.8)",
              }}
            >
              {content.description}
            </ThemedText>
          </View>
        ))}
      </ThemedScrollView>
    </ThemedView>
  );
}
