import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { homeContent } from "@/constants/temporary/home-content";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      {/* header */}
      <ThemedHeaderView>
        <ThemedText type="title">GRABENGO</ThemedText>
      </ThemedHeaderView>
      {/* main */}
      <ThemedScrollView
        contentContainerStyle={{
          alignItems: "center",
          marginTop: 20,
          marginBottom: 100,
        }}
      >
        {homeContent.map((content) => (
          <View key={content.id} style={{ marginBottom: 60, width: "80%" }}>
            <ThemedText
              type="subtitle"
              style={{
                marginBottom: 10,
              }}
            >
              {content.header}
            </ThemedText>

            <View
              style={{
                width: "100%",
                height: 180,
                alignSelf: "center",
                shadowColor: "rgb(0, 0, 0)", // iOS
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 8, // android
                backgroundColor: "white",
                borderRadius: 15,
                overflow: "hidden",
                position: "relative", // for absolute overlay
              }}
            >
              <Image
                source={{ uri: content.uri }}
                style={{
                  width: "100%",
                  height: "100%",
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
                  color: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                {content.overlay}
              </ThemedText>
            </View>

            <ThemedText
              style={{
                fontSize: 14,
                paddingTop: 10,
                paddingHorizontal: 10,
                color: "rgba(254, 254, 254, 0.6)",
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
